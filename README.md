# Лабораторно-практична робота №5

## Розширення бекенд-додатку власними сутностями та реалізація REST API

## Діаграмма сутностей:


## Короткий опис реалізованих сутностей:
### City - сутність описує всі міста.
### Facultation - сутність описує всі факультети.
### Specialization - сутність описує всі спеціалізації.
### University_manager - сутність описує всіх керівників практики з універсітету.
### Practice_place - сутність описує всі місця практики та їх популярність.
### Practice_place_manager - сутність описує всіх керівників практики з підприємтсва.
### Student - сутність описує всіх студентів.
### Practice_place_rating - звязуюча сутність ManytoMany, що описує оцінку практики від student на Practice_place.
### Application - сутність всіх заявок від студента. 
### Tasks - сутність описує всі задачі, що отримує Application.

## Основні контролери:

### 1. **City**

**Функції:**

* `GET /city` — перегляд списку міст
* `POST /city` — додати місто
* `PUT /city/:id` — редагувати
* `DELETE /city/:id` — видалити

---

### 2. **Practice_place**

**Функції:**

* `GET /practice_places` — перегляд усіх місць практики
* `GET /practice_place/:id` — перегляд конкретного місця
* `POST /practice_place` — додавання нового місця (HR)
* `PUT /practice_place/:id` — редагування
* `DELETE /practice_place/:id` — видалення

---

### 3. **Practice_place_manager (КПМП)**

**Функції:**

* `GET /practice_manager` — список керівників практики (КПМП)
* `POST /practice_manager` — додавання
* `PUT /practice_manager/:id` — редагування
* `DELETE /practice_manager/:id` — видалення
* `GET /practice_manager/:id/application` — перегляд заявок
* `PUT /application/:id/status` — узгодження / відхилення заявок
* `POST /task` — додавання задач
* `PUT /task/:id` — редагування задачі
* `DELETE /task/:id` — видалення задач

---

### 4. **University_manager (КПУ)**

**Функції:**

* `GET /university_manager` — список керівників (КПУ)
* `POST /university_manager` — додавання
* `PUT /university_manager/:id` — редагування
* `DELETE /university_manager/:id` — видалення
* `GET /application` — перегляд заявок студентів
* `PUT /application/:id/status` — узгодження / відхилення
---

### 5. **Facultation**

**Функції:**

* `GET /facultation` — список факультетів
* `POST /facultation` — додати факультет
* `PUT /facultation/:id` — редагувати
* `DELETE /facultation/:id` — видалити

---

### 6. **Specialization**

**Функції:**

* `GET /specialization` — список спеціальностей
* `POST /specialization` — додати
* `PUT /specialization/:id` — редагувати
* `DELETE /specialization/:id` — видалити

---

### 7. **Student**

**Функції:**

* `GET /student` — перегляд усіх студентів (HR)
* `POST /student` — додати студента
* `PUT /student/:id` — редагувати
* `DELETE /student/:id` — видалити
* `GET /student/:id/application` — перегляд заявок
* `POST /application` — подати заявку
* `POST /rating` — оцінити місце практики

---

### 8. **Application**

**Функції:**

* `GET /application` — перегляд усіх заявок
* `GET /application/:id` — перегляд конкретної заявки
* `POST /application` — створити заявку
* `PUT /application/:id/status` — змінити статус
* `PUT /application/:id/term` — встановити терміни
* `DELETE /application/:id` — видалити

---

### 9. **Task**

**Функції:**

* `GET /task/:applicationId` — перегляд задач конкретної заявки
* `POST /task` — створити задачу
* `PUT /task/:id` — редагувати
* `DELETE /task/:id` — видалити

---

### 10. **Practice_place_rating**

**Функції:**

* `POST /rating` — студент ставить оцінку
* `GET /rating/:placeId` — отримати середню оцінку місця



