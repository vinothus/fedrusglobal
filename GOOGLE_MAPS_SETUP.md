# Google Maps API Setup Instructions

## Overview
Your contact form uses Google Maps API for address autocomplete functionality. To make this work, you need to configure a Google Maps API key.

## Quick Setup

### Step 1: Get Your API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "API Key"
5. Copy your new API key

### Step 2: Enable Required APIs
1. In Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for and enable these APIs:
   - **Maps JavaScript API**
   - **Places API**

### Step 3: Configure API Key Restrictions (Recommended)
1. Go back to "APIs & Services" > "Credentials"
2. Click on your API key to edit it
3. Under "Application restrictions", select "HTTP referrers (web sites)"
4. Add your website domain (e.g., `*.yourdomain.com/*`)

### Step 4: Update Configuration
1. Open the file: `assets/js/google-maps-config.js`
2. Replace `"YOUR_API_KEY"` with your actual API key:
   ```javascript
   apiKey: "your-actual-api-key-here",
   ```
3. Save the file

### Step 5: Test
1. Refresh your contact page
2. Try typing in any address field - you should see autocomplete suggestions
3. Check browser console for any errors

## Pricing Information
- Google Maps API has a free tier with $300 monthly credit
- Places API costs approximately $0.032 per session
- For most small websites, this stays within the free tier

## Troubleshooting

### Common Issues:

**"Google Maps JavaScript API warning: InvalidKey"**
- Your API key is not set or is incorrect
- Check that you've updated `google-maps-config.js` with your real API key

**"This page can't load Google Maps correctly"**
- API key restrictions are too strict
- Places API or Maps JavaScript API is not enabled

**Address autocomplete not working**
- Places API is not enabled in your Google Cloud Console
- API key doesn't have proper permissions

### Debug Steps:
1. Open browser developer tools (F12)
2. Check the Console tab for error messages
3. Look for network requests to Google Maps API
4. Verify your API key is being loaded correctly

## Security Notes
- Always set up domain restrictions on your API key
- Never commit your real API key to public repositories
- Monitor your API usage in Google Cloud Console
- Set up billing alerts to avoid unexpected charges

## Support
If you continue having issues:
1. Check the browser console for specific error messages
2. Verify your API key has the correct permissions
3. Make sure your domain is added to the API key restrictions
4. Test with a unrestricted API key temporarily to isolate the issue 