# QualgoTest Project

## Overview

This is a test project for Qualgo.

[View Demo](https://youtube.com/shorts/AOyEbZQjPFY)

## Getting Started

### Installation

1. Clone the repository

```bash
git clone https://github.com/qdung/QualgoTest.git
```

2. Navigate to project directory

```bash
cd QualgoTest
```

3. Install dependencies

```bash
yarn
```

## React Native Setup

### iOS Setup

1. Install CocoaPods if you haven't already:

```bash
sudo gem install cocoapods
```

2. Navigate to the iOS directory and install pods:

```bash
cd ios
pod install
```

3. Run iOS app:

```bash
yarn ios
```

Optional: To run on a specific iOS simulator or device, you can modify package.json:

```json
{
  "scripts": {
    "ios": "react-native run-ios",
    "ios:14": "react-native run-ios --simulator='iPhone 14'  -configuration Debug",
    "ios:14pro": "react-native run-ios --simulator='iPhone 14 Pro'  -configuration Debug"
  }
}
```

Then run using:

```bash
yarn ios:14     # For iPhone 14
yarn ios:14pro  # For iPhone 14 Pro
```

### Android Setup

1. Ensure you have Android Studio and SDK installed

2. Add local.properties in android folder (specify your SDK path):

```bash
# For macOS
sdk.dir = /Users/USERNAME/Library/Android/sdk
# For Windows
sdk.dir = C:\\Users\\USERNAME\\AppData\\Local\\Android\\Sdk
```

3. Build the Android project:

```bash
cd android
./gradlew clean
```

4. Run Android app:

```bash
yarn android
```
