from django.conf.urls import url
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

from project1 import views as project1_views
from boards import views


urlpatterns = [
    url(r'^project1q3/result$', views.BoardListView3.as_view(), name='project1q3result'),
    url(r'^project1q2$', views.BoardListView2.as_view(), name='project1q2'),
    url(r'^project1q1$', views.BoardListView1.as_view(), name='project1q1'),
    url(r'^project1q3/$', project1_views.project1q3, name='project1q3'),
    url(r'^$',views.BoardListView.as_view(), name='home'),
]

urlpatterns += staticfiles_urlpatterns()