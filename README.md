# Вызываемые команды при создании проекта
npm init -y

# Пользователям Windows нужно использовать следующую команду, для активации окружения

C:\Users\gvido\flask_app>env\Scripts\activate


# При клонировании репозитория на другой компьютер или сервер выполните (предварительно создав и активировав нужное виртуальное окружение):
$ pip install -r requirements.txt

#Запуск сервера локально на windows
waitress-serve --listen=*:8000 main.wsgi:application
#Создание локальной переменной с конфигом базы
set DATABASE_URL=postgres://cnpkgwnjqlkwvd:d0f7a5f399ba9d64d2b0300ff58940d8025b4bdfab12579c80ee0df219652479@ec2-50-17-197-184.compute-1.amazonaws.com:5432/d707kuvm5klvqoazonaws.com:5432/d707kuvm5klvqo