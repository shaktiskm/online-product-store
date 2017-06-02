curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
nvm install 6.10.2
source ~/.bashrc
nvm use 6.10.2
npm install
npm install -g grunt-cli
grunt