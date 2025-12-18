# Theme Maker - SCSS Color Extractor & Editor

## Overview

**Theme Maker** is a Python GUI application that helps you manage, edit, and update SCSS color variables across your entire project. It provides an intuitive interface to:

- Extract color variables from `root.scss` files
- Preview colors visually with both solid and gradient support
- Edit color names and values with real-time previews
- Convert between color formats (HEX, RGB, HSL)
- Apply bulk changes to all color variables across your project files

This tool is perfect for theme management in design systems, maintaining consistent branding, and refactoring color schemes across large projects.

---

## Features

### 1. **Directory Scanning**
- Recursively scans selected directories for `root.scss` files
- Supports multiple `root.scss` files in different locations
- Extracts all CSS custom properties (variables) from `:root` blocks

### 2. **Color Extraction & Display**
- Automatically finds and displays all color variables from SCSS files
- Shows both original and preview representations
- Supports:
  - **Solid Colors**: HEX, RGB, HSL formats
  - **Gradients**: Linear, radial, and conic gradients

### 3. **Interactive Color Editing**
- **Name Editing**: Change color variable names (simple names, namespace added automatically)
- **Value Editing**: Update color values with instant previews
- **Color Picker**: Built-in color picker for easy color selection
- **Format Conversion**: Convert between HEX, RGB, and HSL formats with dedicated buttons
- **Reset Functionality**: Revert changes back to original values

### 4. **Namespace Support**
- Prepend a custom namespace to all color variable names
- Format: `--color-{NAMESPACE}-{colorname}`
- Example: `--color-primary-red` becomes `--color-NOTOTEKA-red` with namespace "NOTOTEKA"

### 5. **Bulk Operations**
- **Mark All for Update**: Mark all colors as ready for changes
- **Apply All Changes**: Apply all edited colors across the entire project

### 6. **Smart Replacements**
- Updates `root.scss` files with new color values and names
- Replaces color variable references in all project files
- Automatically updates both:
  - CSS variable references (e.g., `--color-primary-red`)
  - Tailwind class references (e.g., `--color-primary-red` variants)
- Skips system directories (`.git`, `node_modules`, `.venv`, etc.)
- Skips binary files (images, fonts, etc.)

---

## Installation

### Requirements
- Python 3.7+
- tkinter (usually comes with Python)

### Setup
```bash
# No additional packages required - uses only Python standard library
python main.py
```

---

## How to Use

### Step 1: Launch the Application
```bash
python main.py
```

A GUI window titled "Theme Maker - SCSS Color Extractor & Editor" will open.

### Step 2: Select a Directory
1. Click the **"Browse Directory"** button
2. Navigate to and select the root folder of your project (e.g., your Nuxt project root)
3. The app will scan all subdirectories for `root.scss` files

### Step 3: Set a Namespace
1. Enter a namespace in the **"Namespace"** input field (e.g., "primary", "NOTOTEKA")
2. This namespace will be prepended to all color variable names during the replacement
3. Format: `--color-{NAMESPACE}-{colorname}`

### Step 4: Review Extracted Colors
- The app displays all found color variables
- Each color shows:
  - **Original section**: Shows the original name, value, and preview
  - **Edit section**: Where you can modify names and values
  - **New Preview section**: Live preview of your changes

### Step 5: Edit Colors

#### Edit a Single Color:
1. Modify the **"New Name"** field to change the color's name
2. Modify the **"New Value"** field to change the color value
3. Use the **color picker (🎨)** button to select a color visually
4. Use format conversion buttons to convert between formats:
   - `→ HEX`: Convert to hexadecimal (e.g., #FF0000)
   - `→ RGB`: Convert to RGB format (e.g., rgb(255, 0, 0))
   - `→ HSL`: Convert to HSL format (e.g., hsl(0, 100%, 50%))
5. Use **"Reset"** button to revert to original values
6. Changes update in real-time in the "New Preview" section

#### Mark All or Mark Single:
- **Mark for Update**: Click the button for individual colors to prepare them for updates
- **Mark All for Update**: Use the button at the top to mark all colors at once

### Step 6: Apply Changes
1. Review all your edits in the preview sections
2. Click **"Apply All Changes"** button
3. A confirmation dialog will appear - confirm to proceed
4. The app will:
   - Update all `root.scss` files with new values and names
   - Replace color variable names throughout your entire project
   - Update both CSS variable references and Tailwind class references

### Step 7: Monitor Progress
- The terminal displays detailed logs showing:
  - Timestamp for each operation
  - Files being processed
  - Number of replacements made
  - Success/warning/error messages with emojis for visual clarity

---

## Terminal Output Guide

### Log Types

| Symbol | Type | Meaning |
|--------|------|---------|
| ➜ | Step | A processing step is starting |
| ✓ | Success | Operation completed successfully |
| ⚠ | Warning | Non-critical issue detected |
| ✗ | Error | An error occurred |
| ℹ | Info | Informational message |
| 📁 | Directory | Directory-related operation |
| 📄 | File | File-related operation |
| 🎨 | Color | Color-related operation |
| 🔄 | Replace | Variable replacement |
| 🔍 | Search | Scanning/searching operation |
| 💾 | Save | File save operation |

### Example Log Output:
```
============================================================================
  🔍 DIRECTORY SCAN STARTED
============================================================================

➜ [12:34:56] Selected directory: /home/user/myproject
🔎 [12:34:57] Searching for root.scss files...
📄 [12:34:57] Found root.scss at: /home/user/myproject/assets/css/root.scss
🎯 [12:34:57] Found 1 root.scss file(s)
🎨 [12:34:57] Extracted 25 color variable(s)
✨ [12:34:58] Colors loaded and displayed
```

---

## Project Structure Example

For a typical Nuxt project:
```
my-nuxt-project/
├── app/
│   ├── assets/
│   │   └── css/
│   │       └── root.scss          ← Theme Maker finds this
│   ├── components/
│   ├── pages/
│   └── stores/
├── public/
├── nuxt.config.ts
└── package.json
```

---

## Example Workflow

### Scenario: Rename Primary Color Theme

**Before:**
```scss
:root {
  --color-default-red: #FF0000;
  --color-default-red-rgb: 255 0 0;
  --color-default-blue: #0000FF;
}
```

**After running Theme Maker with namespace "primary":**
```scss
:root {
  --color-primary-red: #FF0000;
  --color-primary-red-rgb: 255 0 0;
  --color-primary-blue: #0000FF;
}
```

All references to these colors throughout your project are automatically updated:
- CSS: `color: var(--color-default-red)` → `color: var(--color-primary-red)`
- Tailwind: `text-default-red` → `text-primary-red`

---

## Technical Details

### Color Format Support
- **HEX**: `#FF0000`
- **RGB**: `rgb(255, 0, 0)` or `rgba(255, 0, 0, 1)`
- **HSL**: `hsl(0, 100%, 50%)`
- **Gradients**: `linear-gradient(...)`, `radial-gradient(...)`, `conic-gradient(...)`

### File Handling
- **Text Encodings**: UTF-8 with fallback for encoding errors
- **Skipped Directories**: `.git`, `node_modules`, `.venv`, `venv`, `__pycache__`, `.pytest_cache`, `.next`, `dist`, `build`, `.DS_Store`
- **Skipped File Types**: Binary files (images, fonts, executables, archives, etc.)

### Variable Naming Convention
- **Full format**: `--color-{NAMESPACE}-{colorname}`
- **RGB variants**: Automatically handled with `-rgb` suffix
- **Case-sensitive**: Variable names are case-sensitive

---

## Troubleshooting

### No colors found after scanning?
- Ensure your SCSS files use the `:root { }` block format
- Check that files are named exactly `root.scss` (case-sensitive on Linux/Mac)
- Verify the file path is correct

### Color preview shows blank/gray?
- The color value might be in an unsupported format
- Try using the format conversion buttons
- Use the color picker to set a valid color

### Changes not applied?
- Ensure you've entered a valid namespace (letters and numbers only)
- Confirm the confirmation dialog appeared and you clicked "Yes"
- Check file permissions - ensure write access to the directory

### Only some files updated?
- Check the terminal output for errors
- Some files might be read-only
- Binary files and skipped directories won't be processed (this is intentional)

---

## Color Management Best Practices

1. **Use Consistent Naming**: Keep color names descriptive and consistent
2. **Organize by Type**: Group related colors (primary, secondary, neutral, etc.)
3. **Semantic Naming**: Use meaningful names like `primary-blue` rather than `color-123`
4. **Version Control**: Commit changes to version control before making bulk updates
5. **Test After Updates**: Verify that UI looks correct after applying changes

---

## Keyboard Shortcuts

- **Mouse Wheel**: Scroll through colors in the main display area
- **Button-4 / Button-5**: Scroll on Linux/X11 systems

---

## Dependencies

**Zero external dependencies!** This tool uses only Python's standard library:
- `tkinter`: GUI framework
- `os`, `re`, `shutil`, `pathlib`, `colorsys`, `datetime`: Standard utilities

---

## License

This tool is part of the NuxtTemplate project.

---

## Support & Feedback

For issues, feature requests, or improvements, please refer to the main project repository.
