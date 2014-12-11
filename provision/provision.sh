!/bin/bash

apt-get update

# # Install git and curl
apt-get -y install curl git node.js unzip tcl8.5 build-essential

# Install zsh and Configure zsh as the default shell
apt-get -y install zsh 
echo `which zsh` >> /etc/shells
chsh -s `which zsh` vagrant

# Run as vagrant user
su vagrant << EOF
	# Install rvm and ruby
	cd /vagrant
	gpg --keyserver hkp://keys.gnupg.net --recv-keys D39DC0E3
	\curl -sSL https://get.rvm.io | bash -s stable --ruby=2.1.1
	source /home/vagrant/.rvm/scripts/rvm
	rvm use 2.1.1

	# Bundle install all the gems needed
	gem install bundler
	bundle install

	# Install Jekyll
	gem install jekyll

	# Install and configure oh-my-zsh
	curl -L http://install.ohmyz.sh | sh
	cd /home/vagrant/.oh-my-zsh && git clone git://github.com/zsh-users/zsh-syntax-highlighting.git
	rm -rf /home/vagrant/.zshrc
	echo 'export ZSH=/home/vagrant/.oh-my-zsh
ZSH_THEME="pygmalion"
ENABLE_CORRECTION="true"
COMPLETION_WAITING_DOTS="true"
DISABLE_UNTRACKED_FILES_DIRTY="true"
plugins=(git colorize)
source /home/vagrant/.oh-my-zsh/oh-my-zsh.sh
export LANG=en_US.UTF-8
source /home/vagrant/.oh-my-zsh/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh' >> /home/vagrant/.zshrc

	source /home/vagrant/.zshrc
	rm -rf postinstall.sh
EOF