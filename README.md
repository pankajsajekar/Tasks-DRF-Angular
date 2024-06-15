# Tasks

## Follow the installation steps

1. Clone the repository:

```bash
git clone https://github.com/pankajsajekar/Tasks-DRF-Angular.git
```

## A. Setup Backend (DRF)
1. change dir
```
cd Backend
```

2. Create a virtual environment
```
python -m venv venv

```
3. Activate virtual environment
```
command - .\venv\Scripts\activate
```
4. Install packages from requirements file
```
pip install -r requirements.txt
```

6. Create Database (I already Created Database you direct go on 7th step)
```
python manage.py makemigrations
python manage.py migrate
```
7. Run server
```
python manage.py runserver
```
8. If Your Are using My SQLite Database
Login in Djano admin panel using bellow Crediential.
```
Username: admin
Password: 321
```


## B. Setup FrontEnd (Angular)

1. change dir
```
cd Frontend
```

2. Install NPM, toastr
```
npm install
npm install ngx-toastr --save
```
If Bootstrap is not install then Enter this command `npm install bootstrap --save`

3. Run Angular Server
```
ng serve
```


### Basic Detials
I create Task Management (CRUD Functionality) <br>
we can do add new task, delete task, update task. <br>
See all task <br>
I done authentication part in DRF but In angular is incomplete (remaining only guard, interceptor i will do after few hours) <br>
I used Bootstrap for good looking <br>
