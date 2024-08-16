CREATE TABLE IF NOT EXISTS restaurant (
    id INT AUTO_INCREMENT PRIMARY KEY,
    restaurant_name TEXT,
    is_meal BOOLEAN,
    signature_menu_type TEXT,
    detail_food_type TEXT,
    signature_menu TEXT,
    signature_menu_price INT,
    distance INT,
    running_day TEXT,
    weekday_running_time TEXT,
    weekend_running_time TEXT,
    can_delivery BOOLEAN,
    can_many_people BOOLEAN,
    can_ca_gong BOOLEAN
);

CREATE TABLE IF NOT EXISTS menu (
    id INT,
    menu_id INT AUTO_INCREMENT PRIMARY KEY,
    menu_name TEXT,
    menu_price TEXT,
    menu_type TEXT,
    detail_menu_type TEXT,
    menu_description TEXT,
    FOREIGN KEY (id) REFERENCES restaurant(id) ON DELETE CASCADE
);

INSERT INTO restaurant (restaurant_name, is_meal, signature_menu_type, detail_food_type, signature_menu, signature_menu_price, distance, running_day, weekday_running_time, weekend_running_time, can_delivery, can_many_people, can_ca_gong) 
VALUES ('테스트-음식점이름-ㅇㅇㅇㅇ', TRUE, '면', '쌀국수', '테스트-음식이름-쌀국수', 8000, 500, '월~일', '11:00-22:00', '11:00-20:00', TRUE, FALSE, FALSE);

INSERT INTO menu (id, menu_name, menu_price, menu_type, detail_menu_type, menu_description) 
VALUES (1, '테스트-음식이름-쌀국수', '8000', '면', '쌀국수', '맛있어요');

INSERT INTO menu (id, menu_name, menu_price, menu_type, detail_menu_type, menu_description) 
VALUES (1, '테스트-음식이름-쌀국수222', '9000', '면', '쌀국수', '맛있어요222');


INSERT INTO restaurant (restaurant_name, is_meal, signature_menu_type, detail_food_type, signature_menu, signature_menu_price, distance, running_day, weekday_running_time, weekend_running_time, can_delivery, can_many_people, can_ca_gong) 
VALUES ('테스트-음식점-컵밥', TRUE, '밥', '컵밥', '테스트-음식이름-컵밥', 5500, 500, '월~금', '10:30-:18:00', '', TRUE, FALSE, FALSE);

INSERT INTO menu (id, menu_name, menu_price, menu_type, detail_menu_type, menu_description) 
VALUES (2, '테스트-음식이름-컵밥', '5500', '밥', '컵밥', '컵밥도맛있어요');

INSERT INTO menu (id, menu_name, menu_price, menu_type, detail_menu_type, menu_description) 
VALUES (2, '테스트-음식이름-컵밥집에서떡볶이라니', '6000', '기타', '떡볶이', '아마도맛있을수도있고아닐수도있고');
