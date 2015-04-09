FROM python:2.7.9

MAINTAINER Sam Liu 

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

RUN pip install -U pip

COPY requirements.txt /usr/src/app/

RUN pip install -r requirements.txt

ADD . /usr/src/app

EXPOSE 8000

CMD ["gunicorn", "-b", "0.0.0.0:8000", "-c", "config/gunicorn.py", "ology.wsgi:get_application()"]
