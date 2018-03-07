import ssl
from django.db.models import Count
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.shortcuts import get_object_or_404, redirect, render
from django.views.generic import UpdateView, ListView
from django.utils import timezone
from django.utils.decorators import method_decorator
from django.urls import reverse

from .forms import NewTopicForm, PostForm
from .models import Board, Post, Topic


class BoardListView(ListView):
    model = Board
    context_object_name = 'boards'
    template_name = 'home.html'


class BoardListView1(ListView):
    model = Board
    context_object_name = 'boards'
    template_name = 'P1Q1result.html'


class BoardListView2(ListView):
    model = Board
    context_object_name = 'boards'
    template_name = 'P1Q2result.html'


class BoardListView3(ListView):
    model = Board
    context_object_name = 'boards'
    template_name = 'P1Q3result.html'
