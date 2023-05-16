FROM python:3.10.8-alpine

ENV PYTHONDONTWRITEBYTECODE=1

ENV PYTHONUNBUFFERED=1

WORKDIR /app/backend

COPY . .

RUN pip install -r requirements.txt

RUN ./djangostart.sh

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]
