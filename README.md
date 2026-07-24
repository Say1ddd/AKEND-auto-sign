# Introduction
Before started using this script, you will need to complete [setting up your own workflow](https://github.com/Say1ddd/AKEND-auto-sign#setting-up-your-own-workflow) and [setting up secrets](https://github.com/Say1ddd/AKEND-auto-sign#setting-up-secrets) which will be described in the steps below.

## Setting Up Your Own Workflow
You must set up your own repository to have your own automatic workflow running, you can do so by doing one of the options below.
> [!WARNING]
> Since this script is essentially a reverse engineer project, the api it used can change at any time. It is recommended to fork this repository to allow syncing with the latest changes by using the 'Sync Fork' button. 

### By Forking
You can also fork this repository by opening https://github.com/Say1ddd/AKEND-auto-sign/fork or by clicking the 'fork' button.
> [!NOTE]
> Github disables workflow from forks by default.
> You can enable it by opening your fork repository's settings, then inside "Code, planning, and automation"'s `actions > general` and you should find an option that says "allow actions" or "enable actions".

### By Importing
Import this repository by opening https://github.com/new/import then add this repositry's url as source repository, be note that this method does not have syncing feature.

### By Cloning
You can also use the clone function if you prefer. This is rather advanced, but I believed that you understand enough to do it yourself if you skipped all of the steps above.

## Setting Up Secrets
> [!IMPORTANT]
> you can get your token by logged into SKPort and then get the value by opening your browser's developer tool by using shortcut `ctrl+shift+I` or by right clicking then selecting the option `inspect`. Then open the 'Application' or 'Storage' tab (different on each browsers) and under 'Cookies' of `https://game.skport.com` you should see a row named `ACCOUNT_TOKEN`, finally copy and paste the value into your `ACCOUNT_TOKEN` secrets.

You will need to provide a secret to your workflow that contains `ACCOUNT_TOKEN` of your SKPort account. you can provide the secrets by opening your repository's settings inside "Security and quality"'s `Secrets and variables > actions` then add the "Repository secrets" called `ACCOUNT_TOKEN`.<br>

Sign into your Endfield SKPort profile at https://game.skport.com/endfield/sign-in
