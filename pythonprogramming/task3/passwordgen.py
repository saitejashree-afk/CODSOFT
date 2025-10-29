import random
import string

print("----- PASSWORD GENERATOR -----")
while True:
    try:
        length = int(input("Enter the desired password length: "))
        if length < 4:
            print("Password should be at least 4 characters long. Try again!")
        else:
            break
    except ValueError:
        print("Please enter a valid number.")
letters = string.ascii_letters       
numbers = string.digits              
symbols = string.punctuation         
all_characters = letters + numbers + symbols
password = "".join(random.choice(all_characters) for _ in range(length))
print("\nYour Secure Password is:", password)
print("--------------------------------")