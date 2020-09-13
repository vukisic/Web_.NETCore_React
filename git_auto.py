import os
import sys
import subprocess

print("Welcome to Git Automation!")
print("Author: Vuk Isic\n\n\n")
print("Manual: Just place in git repo folder and run!\n\n")
message = input("Commit message:")
try:
    subprocess.call(f'git add .')
    subprocess.call(f'git commit -m \"{message}\" .')
    subprocess.call(f'git push origin master')
    print("\nAll done!\n")
except:
    print(f"Exception:{sys.exc_info()[0]}")