import requests
import json
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class SignUpForm(UserCreationForm):
    email = forms.CharField(max_length=254, required=True, widget=forms.EmailInput())

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')


class UserInformationUpdateForm(forms.ModelForm):
	email = forms.EmailField()
	class Meta:
		model = User
		fields = ('first_name', 'last_name', 'email', )

class Process_Visualization_3:
    def __init__(self):
    	self.data = []
        
    def process_data(self,url,rep):
        r = requests.get(url);
        languages = []
        if(r.ok):
            # load the request to json file
            self.all_data = json.loads(r.content.decode('utf-8'));
            #print(self.all_data)
            keys = list(self.all_data.keys())
            values = list(self.all_data.values())
            for i in range(0,len(keys)):
            	#print(data)
            	languages.append({'name':keys[i],'size':values[i]});
            
            self.data.append({'name':rep,'children':languages})
                
        else:
            print ("[Warning] Unable to read data from github. Please check. Loading previously saved raw file...");
            self.data = json.loads(open(raw_file));
    
    def save_processed_data(self,output_file):
        with open(output_file, 'w') as outfile:
            outfile.write(json.dumps({'name':'Language','children':self.data}, indent=4));
