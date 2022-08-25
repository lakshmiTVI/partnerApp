
Steps to run react native app on ios simulator (Ref Link for getting started with react-native: https://reactnative.dev/docs/environment-setup)

Step 1: Run below commands to install react-native in terminal

If running for the first time run below commands

        npm i -g react-native-cli
        npm i -g react-native

If evnvironment already set run  below command, it will install the node modules

npm install

Step 2: Install Xcode from App store ( Installing Xcode will also install the iOS Simulator and all the necessary tools to build your iOS app.)

Step 3: Installing an iOS Simulator in Xcode

To install a simulator, open Xcode > Preferences... and select the Components tab. Select a simulator with the corresponding version of iOS you wish to use.

Step 4: Run below commands in Terminal To install Home brew (Ref Link:https://phoenixnap.com/kb/install-homebrew-on-mac)

Install Xcode Command Line Tools:

1. From the Finder, select Go and click Utilities to display all the utilities.

2. Locate and launch the Terminal app.

3. In the terminal, run the following command to install Xcode command line tools:

    xcode-select --install

4. Click Install when prompted to proceed with the installation.

5. The script displays the Xcode License Agreement. If you agree to the terms, click Agree and wait for the installation to finish.

Step 5: Install Homebrew

After installing Xcode command-line tools, follow the steps below to install Homebrew.

1. Download the installation script by running below command in Terminal:

/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

2. Enter your administrator password when prompted and press Return to continue. Wait for the download to finish.

3. Press Return to install Homebrew. The installation may take a couple of minutes, so wait for the Installation successful message to appear.

4. Disable the analytic data collection by running: brew analytics off


Step 6: Run the following commands in a Terminal after installing Homebrew ( If node already installed on system note that Node version must be 14 or newer)

    brew install node
    brew install watchman


Step 7: Install CocoaPods by running below command

    sudo brew install cocoapods


Steps to Run your React Native application:

Step 1: Run npm install in Terminal in project folder path

Step 2: Start Metro Bundler

To start Metro, run below command inside your React Native project folder:

    npx react-native start

Step 3: Start your application

Let Metro Bundler run in its own terminal. Open a new terminal inside your React Native project folder. Run the following:

    npx react-native run-ios

You should see your new app running in the iOS Simulator shortly.

If any error comes related to podfile, do the below steps:

1. cd ios inside the project folder

2. Run pod install

Come back again to project path run the application

Accessing the In-App Developer Menu:

Press command key and D together in keyboard when your app is running in the iOS Simulator
Or select iOS Simulator > Menu Bar > Device > Shake 
It will show action bar in simulator .Select start debugging


To do the wrapper module changes open ios->partnerApp.xcworkspace folder of react-native project in xcode editor
After every changes in xcode , run npx react-native run-ios  to run the app on simulator with the updated changes.



