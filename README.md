# Вызываемые команды при создании проекта
npm init -y

# Пользователям Windows нужно использовать следующую команду, для активации окружения

C:\Users\gvido\flask_app>env\Scripts\activate


# При клонировании репозитория на другой компьютер или сервер выполните (предварительно создав и активировав нужное виртуальное окружение):
$ pip install -r requirements.txt

#Запуск сервера локально на windows
waitress-serve --listen=*:8000 main.wsgi:application