from django import forms
from posts.models import Image, Post, Category
from suit_redactor.widgets import RedactorWidget
from suit_ckeditor.widgets import CKEditorWidget


class PostForm(forms.ModelForm):

    def __init__(self, *args, **kwargs):
        super(PostForm, self).__init__(*args, **kwargs)
        self.fields['category'].queryset = Category.objects.exclude(parent=None)

    class Meta:
        model = Post
        fields = ['zh_title', 'en_title', 'category', 'credits', 'articletext', 'starred', 'published']
        widgets = {
            'articletext': RedactorWidget()
        }


class ImageForm(forms.ModelForm):

    class Meta:
        model = Image
        fields = ['post', 'is_cover', 'caption', 'img']
