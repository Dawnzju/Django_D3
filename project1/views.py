import json
import requests
import re
import urllib.request
import ssl
import string
from bs4 import BeautifulSoup  
import os
import logging
from django.contrib.auth import login as auth_login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.shortcuts import redirect, render
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.views.generic import UpdateView

from .forms import SignUpForm, UserInformationUpdateForm,Process_Visualization_3

def getHtml(url):
    page = urllib.request.urlopen(url)
    html = page.read()
    html = html.decode('utf-8')
    soup = BeautifulSoup(html,'html.parser')
    repositories = soup.find_all('a',itemprop ="name codeRepository")
    results = soup.find_all('span',itemprop = "programmingLanguage")
    proLans = []
    for proLan in results:
        proLans.append(proLan.string.split()[0])
        #print(proLans)
        #print(repositories)
    i = 0
    url_reps = []
    for rep in repositories:
        a=rep.string.split()
        url_reps.append("/torvalds/"+a[0])
        i = i+1
            #print(url_rep)
        
    return url_reps


def project1q3(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        ssl._create_default_https_context = ssl._create_unverified_context
        username = request.POST.get("username")
        url = "https://github.com/"+username+"?tab=repositories"
        url_reps = getHtml(url)

        logging.debug(url_reps)
        visual_obj = Process_Visualization_3();
        for url in url_reps:
            data = visual_obj.process_data("https://api.github.com/repos"+url+"/languages",url)
        visual_obj.save_processed_data('static/processed_visualization_3.json');
        
        return redirect('project1q3result')
    else:
        logging.debug("do not post")

        form = SignUpForm()
    return render(request, 'P1Q3.html', {'form': form})


@method_decorator(login_required, name='dispatch')
class UserUpdateView(UpdateView):
    form_class = UserInformationUpdateForm
    template_name = 'my_account.html'
    success_url = reverse_lazy('my_account')

    def get_object(self):
        return self.request.user
