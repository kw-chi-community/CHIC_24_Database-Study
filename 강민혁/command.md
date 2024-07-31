- `order by`<br>결과를 정렬

- `group by`<br>데이터를 특정 열을 기준으로 그룹화하여, 동일한 값을 가진 행들을 묶음<br>
  일반적으로 GROUP BY 절은 SUM(), COUNT(), AVG(), MAX(), MIN()과 같은 집계 함수와 함께 사용
  - `GROUP BY USER_ID, PRODUCT_ID HAVING COUNT(*) > 1`
    - `HAVING`: group으로 묶인 각 그룹에 대한 조건 설정.
    - `COUNT(*) > 1`:는 각 그룹의 행 수를 계산, 1 초과한 user_id, product_id만 남김

---

### 함수

- `COALESCE(value1, value2, ..., valueN)` <br>첫 번째 인자가 NULL이 아닌 경우, 그 값을 반환.<br>첫 번째 인자가 NULL, 두 번째 인지가 NULL이 아닐 경우, 두 번째 인자를 반환 ...<br> 모두 NULL일 경우 NULL을 반환

- `COUNT(조건)`<br>조건을 만족하는 row의 수를 count

- `month()`, `HOUR()`, `MINUTE()`, `SECOND()` ...<br> 값이 date형일 때, 알아서 잘 분할해서 반환함.

- `date_format(value, '%Y-%m-%d')`<br>date형식인 value를 두번째 인자 형식으로 리턴

---

### join


##### left join == left outer join

```sql
SELECT 조회할 컬럼
FROM 기준테이블1 
LEFT OUTER JOIN 테이블2
ON 조건문
[WHERE 추가조건문]
```
