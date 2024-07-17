from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional
from passlib.context import CryptContext
from datetime import datetime, timedelta
import jwt
import sqlite3
from fastapi.security import OAuth2PasswordBearer

app = FastAPI()

class UserCreate(BaseModel):
    username: str
    password: str

class User(BaseModel):
    id: int
    username: str
    hashed_password: str
    created_at: datetime

class EpisodeIn(BaseModel):
    title: str

class AnimeIn(BaseModel):
    title: str
    director: str
    episodes: list[EpisodeIn]

class Rating(BaseModel):
    user_id: int
    anime_id: int
    episode_id: int
    score: int

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="if user_id is None:")
        return user_id
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="except jwt.ExpiredSignatureError:")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="except jwt.InvalidTokenError:")
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"{e}")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = "0a3330f31b39db97522d2fdf8a7d9aa50c13d6c6aa374cb8b64a764af541ffd8d598a0bd8dc67148cb665ad785c8952c26cd2a677b6866d0437a3eb69f8ddc5d13a1461ae7f72af58cae88ce55f62527e589ba1d2c97e89048ead92f584a5335e14b67635b24d6a28b71842a1cd7023e6d8f7738c94edc59d8a8074ab383217b644a7e65f6f5280d928e4a157cf3affa776cb27d6a33f8695eeb29b6210e445c270079b6689f70a7e96d9e8b7a6c4369f6c84da020b6c36ed6c6b814a271a2d96b5b017f0b2e35c816d626f2bab2ef0e48ced43d76d7fcadcac0139d958275016e9a7daf6a7ff7b9f69bfd06672a1a103cf0d0febdc0d3349dc77a8a92c85117"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

@app.post("/register", response_model=User)
def register(user: UserCreate):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) FROM users WHERE username = ?", (user.username,))
    count = cursor.fetchone()[0]
    if count > 0:
        raise HTTPException(status_code=400, detail="already exist")

    hashed_password = pwd_context.hash(user.password)
    cursor.execute("INSERT INTO users (username, hashed_password) VALUES (?, ?)", (user.username, hashed_password))
    conn.commit()

    user_id = cursor.lastrowid
    new_user = User(
        id=user_id,
        username=user.username,
        hashed_password=hashed_password,
        created_at=datetime.now()
    )
    return new_user

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

class LoginRequest(BaseModel):
    username: str
    password: str

@app.post("/login")
def login(login_request: LoginRequest):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE username = ?", (login_request.username,))
    user = cursor.fetchone()
    if not user or not pwd_context.verify(login_request.password, user[2]):
        raise HTTPException(status_code=401, detail="invalid --")

    access_token = create_access_token(data={"sub": user[1]})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/upload/animes")
def upload_anime(anime: AnimeIn):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute("INSERT INTO anime (title, director) VALUES (?, ?)", (anime.title, anime.director))
    anime_id = cursor.lastrowid

    for episode in anime.episodes:
        cursor.execute("INSERT INTO episode (title, anime_id) VALUES (?, ?)", (episode.title, anime_id))

    conn.commit()
    return {"message": "anime & episodes uploaded"}


@app.post("/upload/episodes")
def upload_episode(episode: EpisodeIn):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute("INSERT INTO episode (title, anime_id) VALUES (?, ?)", (episode.title, episode.anime_id))
    conn.commit()
    return {"message": "episode uploaded"}


@app.post("/upload")
def upload_anime(anime: AnimeIn):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute("INSERT INTO anime (title, director) VALUES (?, ?)", (anime.title, anime.director))
    anime_id = cursor.lastrowid

    for episode in anime.episodes:
        cursor.execute("INSERT INTO episode (title, anime_id) VALUES (?, ?)", (episode.title, anime_id))

    conn.commit()
    return {"message": "anime & episodes uploaded"}


@app.post("/rate/anime")
def rate_anime(rating: Rating, user_id: int = Depends(get_current_user)):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) FROM anime_ratings WHERE user_id = ? AND anime_id = ?", (user_id, rating.anime_id))
    count = cursor.fetchone()[0]
    if count > 0:
        raise HTTPException(status_code=400, detail="You have already rated this anime.")

    cursor.execute("INSERT INTO anime_ratings (user_id, anime_id, score) VALUES (?, ?, ?)", (user_id, rating.anime_id, rating.score))
    conn.commit()

    return {"message": "anime rated."}


@app.post("/rate/episode")
def rate_episode(rating: Rating, user_id: int = Depends(get_current_user)):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) FROM episode_ratings WHERE user_id = ? AND episode_id = ?", (user_id, rating.episode_id))
    count = cursor.fetchone()[0]
    if count > 0:
        raise HTTPException(status_code=400, detail="You have already rated this episode.")

    cursor.execute("INSERT INTO episode_ratings (user_id, episode_id, score) VALUES (?, ?, ?)", (user_id, rating.episode_id, rating.score))
    conn.commit()

    return {"message": "episode rated"}