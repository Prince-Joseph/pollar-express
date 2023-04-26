from users.models import CustomUser

from django.contrib import messages

def profile_form__validate_and_save(request):

    user = request.user
    form_data = request.POST
    name_validation = CustomUser.first_name__is_valid(form_data["first_name"])
    roll_number_validation = CustomUser.roll_number__is_valid(form_data["roll_number"])
    mobile_number_validation = CustomUser.mobile_number__is_valid(form_data["mobile_number"])
    is_valid = name_validation['is_valid'] and  roll_number_validation['is_valid'] and mobile_number_validation['is_valid']
    
    if is_valid:
            user.first_name = form_data["first_name"]
            user.roll_number = form_data["roll_number"]
            user.mobile_number = form_data["mobile_number"]
            user.save()
            messages.add_message(request, messages.INFO,"Profile was updated")

    else :
            messages.add_message(request, messages.INFO, name_validation['message'])
            messages.add_message(request, messages.INFO, roll_number_validation['message'])
            messages.add_message(request, messages.INFO, mobile_number_validation['message'])