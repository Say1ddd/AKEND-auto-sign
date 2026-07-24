# Introduction
Before started using this script, you will need to complete [setting up your own repository](https://github.com/Say1ddd/AKEND-auto-sign#setting-up-your-own-repository) and [setting up secrets](https://github.com/Say1ddd/AKEND-auto-sign#setting-up-secrets) which will be described in the steps below:

## Setting Up Your Own Repository
You must set up your own repository to have your own automatic workflow running, you can do so by doing one of the options below.

### Using Import Feature
Import this repository by opening https://github.com/new/import then add this repositry's url as source repository.


### By Fork
Fork this repository by opening https://github.com/Say1ddd/AKEND-auto-sign/fork.
> [!NOTE]
> Github disables workflow from forks by default.
> You can enable it by opening your fork repository's settings under `Code, planning, and automation`'s actions > general and you should find the one that says "allow actions".

### Cloning
You can also use the clone function if you prefer. I believed that you understand enough to do it yourself if you skipped both of the steps above.

## Setting Up Secrets
You will need to provide a secret to your workflow that contains `ACCOUNT_TOKEN` of your SKPort account. you can provide the secrets by opening your repository's settings under `Security and quality`'s Secrets and variables > actions then add the Repository secrets. 
> [!IMPORTANT]
> you can get the token by logged in to SKPort and then get the value by opening your browser's developer tool by right clicking then select `inspect` or by using `ctrl+shift+I`, and inside the 'Storage' tab under 'Cookies' you should see that says `ACCOUNT_TOKEN` then copy and paste the value to your secrets.
