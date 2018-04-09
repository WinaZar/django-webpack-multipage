# Django Webpack Multipage Setup

This repo provides setup for static files in Django multipage application using Webpack

## Usage

Let's assume that you have Django based app "myapp" with following folder structure:
```
.
├── myapp
│   ├── static
│   │   └── ...
│   ├── templates
│   │   ├── ...
│   │   ├── base.html
│   │   └── ...
│   └── users
│   │   └── ...
│   └── blog
│   │   └── ...
│   └── ...
├── docs
│   └── ...
├── LICENSE
├── manage.py
├── README.md
└── ...
```
This structure is taken from [Cookiecutter Django](https://github.com/pydanny/cookiecutter-django)

Next clean static directory and clone this repo to it:
```shell
cd ~/myapp/myapp
rm -rf static/
git clone git@github.com:WinaZar/django-webpack-multipage.git ./static
```

Install npm packages:
```shell
cd static/
npm install
```

Install [django-webpack-loader](https://github.com/owais/django-webpack-loader)
```shell
pip install django-webpack-loader
```

Configure it. Add to settings.py:
```python
WEBPACK_LOADER = {
    'DEFAULT': {
        'CACHE': not DEBUG,
        'BUNDLE_DIR_NAME': '/', # must end with slash
        'STATS_FILE': str(BASE_DIR.path('myapp', 'static', 'webpack-stats.json')), # BASE_DIR is your app top level
        'POLL_INTERVAL': 0.1,
        'TIMEOUT': None,
        'IGNORE': ['.+\.hot-update.js', '.+\.map']
    }
}
```

Configure your static settings in settings.py:
```python
STATIC_ROOT = str(BASE_DIR('staticfiles'))
STATIC_URL = '/static/'
STATICFILES_DIRS = [
    str(BASE_DIR.path('myapp', 'static', 'dist')),
]
```

Now you are ready to start development:
```shell
npm run start
```

Production:
```shell
npm run build
```

All bundles must be declared in conf/bundles.js file. By default you have bundle named "base".

You can test the bundle by simply adding the following code to your "base.html" template:
```HTML+Django
{% load render_bundle from webpack_loader %}
<!DOCTYPE html>
<html>
    ...
    {% render_bundle 'base' 'css' %}
    {% render_bundle 'base' 'js' %}
    ...
</html>
```

See source code for details