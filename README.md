```

ynor-extension/
├── .ynor/                          # Ynor configuration
│   ├── config.ynor                 # Global configuration
│   └── plugins/
    ├── i18n.ynor          # Internationalization plugin
    ├── analytics.ynor     # Analytics plugin
    ├── auth.ynor          # Authentication plugin
    └── README.md          # Plugin documentation
├── public/                        # Static files
│   ├── index.html                  # Main HTML entry point
│   ├── favicon.ico                 # Favicon
│   └── assets/                     # Static assets
│       ├── images/                 # Image files
│       └── fonts/                  # Font files
├── src/                           # Source files
│   ├── main.ynor                   # Application entry point
│   ├── app.ynor                    # Root component
│   ├── components/                 # Reusable components
│   │   ├── header.ynor             # Header component
│   │   └── footer.ynor             # Footer component
│   ├── views/                     # Page views
│   │   ├── home.ynor               # Home page
│   │   └── about.ynor              # About page
│   ├── styles/                    # Global styles
│   │   ├── main.css               # Main CSS file
│   │   └── variables.css          # CSS variables
│   └── utils/                     # Utility functions
│       ├── helpers.js             # Helper functions
│       └── constants.js           # Constants
├── ynor-runtime.js                # Ynor runtime (dev version)
├── ynor.config.js                 # Build configuration
└── package.json                   # Project manifest

```