import tkinter as tk
from tkinter import filedialog, messagebox, scrolledtext, colorchooser
import os
import re
from pathlib import Path
from typing import Dict, List, Tuple
import shutil
import colorsys
from datetime import datetime

# ANSI Color codes for terminal output
class Colors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

def log_step(message: str, emoji: str = "➜"):
    """Log a step with emoji and formatting"""
    timestamp = datetime.now().strftime("%H:%M:%S")
    print(f"{emoji} [{Colors.OKBLUE}{timestamp}{Colors.ENDC}] {message}")

def log_success(message: str, emoji: str = "✓"):
    """Log a success message"""
    timestamp = datetime.now().strftime("%H:%M:%S")
    print(f"{emoji} [{Colors.OKGREEN}{timestamp}{Colors.ENDC}] {Colors.OKGREEN}{message}{Colors.ENDC}")

def log_warning(message: str, emoji: str = "⚠"):
    """Log a warning message"""
    timestamp = datetime.now().strftime("%H:%M:%S")
    print(f"{emoji} [{Colors.WARNING}{timestamp}{Colors.ENDC}] {Colors.WARNING}{message}{Colors.ENDC}")

def log_error(message: str, emoji: str = "✗"):
    """Log an error message"""
    timestamp = datetime.now().strftime("%H:%M:%S")
    print(f"{emoji} [{Colors.FAIL}{timestamp}{Colors.ENDC}] {Colors.FAIL}{message}{Colors.ENDC}")

def log_info(message: str, emoji: str = "ℹ"):
    """Log an info message"""
    timestamp = datetime.now().strftime("%H:%M:%S")
    print(f"{emoji} [{Colors.OKCYAN}{timestamp}{Colors.ENDC}] {message}")

def log_section(title: str):
    """Log a section header"""
    print(f"\n{Colors.BOLD}{Colors.HEADER}{'='*70}{Colors.ENDC}")
    print(f"{Colors.BOLD}{Colors.HEADER}  {title}{Colors.ENDC}")
    print(f"{Colors.BOLD}{Colors.HEADER}{'='*70}{Colors.ENDC}\n")

class ThemeMaker:
    def __init__(self, root):
        self.root = root
        self.root.title("Theme Maker - SCSS Color Extractor & Editor")
        self.root.geometry("1400x800")
        
        self.colors_data = {}
        self.new_colors_data = {}  # Store new values for updates
        self.current_directory = tk.StringVar(value="No directory selected")
        self.scss_file_paths = []  # Track all found root.scss files
        self.namespace_input = tk.StringVar(value="")
        self.color_entries = []  # Store references to entry fields for bulk updates
        
        self.setup_ui()
    
    def setup_ui(self):
        """Setup the GUI layout"""
        # Top frame for controls
        control_frame = tk.Frame(self.root, bg="#f0f0f0", pady=10)
        control_frame.pack(fill=tk.X, padx=10)
        
        # Directory selection
        tk.Label(control_frame, text="Selected Directory:", bg="#f0f0f0", font=("Arial", 10)).pack(side=tk.LEFT, padx=5)
        tk.Label(control_frame, textvariable=self.current_directory, bg="#f0f0f0", font=("Arial", 9), fg="blue", wraplength=400, justify=tk.LEFT).pack(side=tk.LEFT, padx=5, fill=tk.X, expand=True)
        
        # Browse button
        browse_btn = tk.Button(control_frame, text="Browse Directory", command=self.browse_directory, bg="#4CAF50", fg="white", padx=10, pady=5)
        browse_btn.pack(side=tk.RIGHT, padx=5)
        
        # Namespace frame
        namespace_frame = tk.Frame(self.root, bg="#f0f0f0", pady=10)
        namespace_frame.pack(fill=tk.X, padx=10)
        
        tk.Label(namespace_frame, text="Namespace (prepended to all colors):", bg="#f0f0f0", font=("Arial", 10, "bold")).pack(side=tk.LEFT, padx=5)
        
        namespace_input = tk.Entry(namespace_frame, textvariable=self.namespace_input, width=20, font=("Arial", 10))
        namespace_input.pack(side=tk.LEFT, padx=5)
        
        tk.Label(namespace_frame, text="Format: --color-NAMESPACE-colorname", bg="#f0f0f0", font=("Arial", 8, "italic"), fg="#666").pack(side=tk.LEFT, padx=10)
        
        # Info frame
        info_frame = tk.Frame(self.root, bg="#f0f0f0", pady=5)
        info_frame.pack(fill=tk.X, padx=10)
        
        tk.Label(info_frame, text="Found Colors:", bg="#f0f0f0", font=("Arial", 10, "bold")).pack(side=tk.LEFT, padx=5)
        self.color_count_label = tk.Label(info_frame, text="0", bg="#f0f0f0", font=("Arial", 10), fg="green")
        self.color_count_label.pack(side=tk.LEFT, padx=2)
        
        # Mark all button
        mark_all_btn = tk.Button(info_frame, text="Mark All for Update", command=self.mark_all_for_update, bg="#FF9800", fg="white", padx=10, pady=5)
        mark_all_btn.pack(side=tk.RIGHT, padx=5)
        
        # Replace All button
        replace_all_btn = tk.Button(info_frame, text="Apply All Changes", command=self.apply_all_changes, bg="#2196F3", fg="white", padx=10, pady=5)
        replace_all_btn.pack(side=tk.RIGHT, padx=5)
        
        # Main content frame with canvas for scrolling
        main_frame = tk.Frame(self.root)
        main_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        # Canvas and scrollbar for color display
        self.canvas = tk.Canvas(main_frame, bg="white", highlightthickness=1)
        scrollbar = tk.Scrollbar(main_frame, orient=tk.VERTICAL, command=self.canvas.yview)
        self.scrollable_frame = tk.Frame(self.canvas, bg="white")
        
        self.scrollable_frame.bind(
            "<Configure>",
            lambda e: self.canvas.configure(scrollregion=self.canvas.bbox("all"))
        )
        
        self.canvas.create_window((0, 0), window=self.scrollable_frame, anchor="nw")
        self.canvas.configure(yscrollcommand=scrollbar.set)
        
        self.canvas.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        
        # Bind mouse wheel scrolling
        self.canvas.bind_all("<MouseWheel>", self._on_mousewheel)
        self.canvas.bind_all("<Button-4>", self._on_mousewheel)
        self.canvas.bind_all("<Button-5>", self._on_mousewheel)
    
    def _on_mousewheel(self, event):
        """Handle mouse wheel scrolling"""
        if event.num == 5 or event.delta < 0:
            self.canvas.yview_scroll(1, "units")
        elif event.num == 4 or event.delta > 0:
            self.canvas.yview_scroll(-1, "units")
    
    def browse_directory(self):
        """Open directory browser dialog"""
        directory = filedialog.askdirectory(title="Select a directory to scan")
        if directory:
            log_section("🔍 DIRECTORY SCAN STARTED")
            log_step(f"Selected directory: {directory}", "📁")
            self.current_directory.set(directory)
            self.scan_directory(directory)
    
    def scan_directory(self, directory: str):
        """Scan directory for root.scss files"""
        try:
            self.colors_data = {}
            self.new_colors_data = {}
            self.scss_file_paths = []
            
            log_step("Searching for root.scss files...", "🔎")
            
            # Search for root.scss files
            found_count = 0
            for root, dirs, files in os.walk(directory):
                if "root.scss" in files:
                    scss_path = os.path.join(root, "root.scss")
                    self.scss_file_paths.append(scss_path)
                    log_info(f"Found root.scss at: {scss_path}", "📄")
                    self.parse_scss_file(scss_path)
                    found_count += 1
            
            log_success(f"Found {found_count} root.scss file(s)", "🎯")
            
            if self.colors_data:
                # Initialize new_colors_data with same values as colors_data
                self.new_colors_data = {k: v for k, v in self.colors_data.items()}
                log_success(f"Extracted {len(self.colors_data)} color variable(s)", "🎨")
                self.display_colors()
                log_success("Colors loaded and displayed", "✨")
                messagebox.showinfo("Success", f"Found and extracted {len(self.colors_data)} color variables from root.scss files")
            else:
                log_warning("No color variables extracted", "⚠")
                messagebox.showwarning("No Results", "No root.scss files found or no color variables extracted")
                self.clear_display()
        
        except Exception as e:
            log_error(f"Error during directory scan: {str(e)}", "💥")
            messagebox.showerror("Error", f"An error occurred while scanning: {str(e)}")
    
    def parse_scss_file(self, filepath: str):
        """Parse SCSS file and extract color variables"""
        try:
            log_step(f"Parsing: {filepath}", "📖")
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Extract content between :root { and }
            root_match = re.search(r':root\s*\{([^}]*)\}', content, re.DOTALL)
            if not root_match:
                log_warning(f"No :root block found in {filepath}", "⚠")
                return
            
            root_content = root_match.group(1)
            
            # Find all variable definitions
            # Pattern: --variable-name: value;
            pattern = r'(--[a-zA-Z0-9\-]+)\s*:\s*([^;]+);'
            matches = re.findall(pattern, root_content)
            
            extracted_count = 0
            for var_name, var_value in matches:
                # Skip -rgb variables (we'll handle them with their base colors)
                if var_name.endswith('-rgb'):
                    continue
                
                var_value = var_value.strip()
                self.colors_data[var_name] = var_value
                extracted_count += 1
            
            log_success(f"Extracted {extracted_count} color(s) from {filepath}", "📦")
        
        except Exception as e:
            log_error(f"Error parsing {filepath}: {str(e)}", "💥")
    
    def display_colors(self):
        """Display extracted colors in the GUI with edit fields"""
        # Clear existing widgets
        for widget in self.scrollable_frame.winfo_children():
            widget.destroy()
        
        # Clear stored entry references
        self.color_entries = []
        
        self.color_count_label.config(text=str(len(self.colors_data)))
        
        # Sort colors by name
        sorted_colors = sorted(self.colors_data.items())
        
        for var_name, var_value in sorted_colors:
            self.create_color_edit_card(var_name, var_value)
    
    def create_color_edit_card(self, var_name: str, var_value: str):
        """Create a card with original and edit fields for a color"""
        card_frame = tk.Frame(self.scrollable_frame, bg="white", bd=1, relief=tk.SOLID)
        card_frame.pack(fill=tk.X, pady=5, padx=0)
        
        # Extract display name (without --color-{namespace}-)
        display_name = self.get_display_name(var_name)
        
        # Original color preview
        original_frame = tk.Frame(card_frame, bg="white")
        original_frame.pack(side=tk.LEFT, fill=tk.BOTH, padx=10, pady=10)
        
        tk.Label(original_frame, text="Original", font=("Arial", 9, "bold"), bg="white", fg="#666").pack()
        
        # Color preview
        is_gradient = self.is_gradient(var_value)
        preview_canvas = tk.Canvas(original_frame, width=100, height=60, bg="white", highlightthickness=1, highlightbackground="#ccc")
        preview_canvas.pack(pady=5)
        
        if is_gradient:
            self.draw_gradient_preview(preview_canvas, var_value)
        else:
            color = self.extract_rgb_color(var_value)
            if color:
                preview_canvas.configure(bg=color)
            else:
                preview_canvas.configure(bg="#e0e0e0")
        
        # Original name and value
        tk.Label(original_frame, text=display_name, font=("Arial", 9, "bold"), bg="white", wraplength=100, justify=tk.CENTER).pack()
        tk.Label(original_frame, text=var_value[:50] + "..." if len(var_value) > 50 else var_value, 
                 font=("Arial", 7, "italic"), bg="white", fg="#666", wraplength=100, justify=tk.CENTER).pack()
        
        # Edit fields
        edit_frame = tk.Frame(card_frame, bg="white")
        edit_frame.pack(side=tk.LEFT, fill=tk.BOTH, expand=True, padx=20, pady=10)
        
        tk.Label(edit_frame, text="Edit to New Values", font=("Arial", 9, "bold"), bg="white", fg="#2196F3").pack(anchor=tk.W)
        
        # New name input (without prefix)
        tk.Label(edit_frame, text="New Name:", font=("Arial", 8), bg="white").pack(anchor=tk.W, pady=(8, 2))
        new_name_entry = tk.Entry(edit_frame, width=40, font=("Arial", 9))
        new_name_entry.insert(0, display_name)
        new_name_entry.pack(anchor=tk.W, pady=(0, 8), fill=tk.X)
        
        # New value input with color picker
        tk.Label(edit_frame, text="New Value:", font=("Arial", 8), bg="white").pack(anchor=tk.W, pady=(2, 2))
        
        value_input_frame = tk.Frame(edit_frame, bg="white")
        value_input_frame.pack(anchor=tk.W, pady=(0, 8), fill=tk.X)
        
        new_value_entry = tk.Entry(value_input_frame, width=33, font=("Arial", 9))
        new_value_entry.insert(0, var_value)
        new_value_entry.pack(side=tk.LEFT, fill=tk.X, expand=True)
        
        # Color picker button
        def open_color_picker():
            color = colorchooser.askcolor(title="Select Color")
            if color[1]:  # If a color was selected
                # Add to entry with conversion options
                hex_color = color[1].lower()
                new_value_entry.delete(0, tk.END)
                new_value_entry.insert(0, hex_color)
                update_new_values()
        
        color_picker_btn = tk.Button(value_input_frame, text="🎨", command=open_color_picker, 
                                      bg="#FF9800", fg="white", font=("Arial", 10), padx=5, pady=2, width=3)
        color_picker_btn.pack(side=tk.LEFT, padx=(5, 0))
        
        # Format conversion buttons
        format_frame = tk.Frame(edit_frame, bg="white")
        format_frame.pack(anchor=tk.W, pady=(5, 8), fill=tk.X)
        
        def convert_format(target_format):
            current_value = new_value_entry.get().strip()
            try:
                hex_color = self.extract_rgb_color(current_value)
                if not hex_color:
                    messagebox.showwarning("Invalid Color", "Could not parse the current color value")
                    return
                
                if target_format == "hex":
                    new_value_entry.delete(0, tk.END)
                    new_value_entry.insert(0, hex_color)
                elif target_format == "rgb":
                    new_value_entry.delete(0, tk.END)
                    new_value_entry.insert(0, self.hex_to_rgb(hex_color))
                elif target_format == "hsl":
                    new_value_entry.delete(0, tk.END)
                    new_value_entry.insert(0, self.hex_to_hsl(hex_color))
                
                update_new_values()
            except Exception as e:
                messagebox.showerror("Conversion Error", f"Could not convert color: {str(e)}")
        
        tk.Button(format_frame, text="→ HEX", command=lambda: convert_format("hex"), 
                 bg="#E0E0E0", fg="#333", font=("Arial", 7), padx=5, pady=1).pack(side=tk.LEFT, padx=2)
        tk.Button(format_frame, text="→ RGB", command=lambda: convert_format("rgb"), 
                 bg="#E0E0E0", fg="#333", font=("Arial", 7), padx=5, pady=1).pack(side=tk.LEFT, padx=2)
        tk.Button(format_frame, text="→ HSL", command=lambda: convert_format("hsl"), 
                 bg="#E0E0E0", fg="#333", font=("Arial", 7), padx=5, pady=1).pack(side=tk.LEFT, padx=2)
        
        # Reset button
        def reset_to_original():
            new_name_entry.delete(0, tk.END)
            new_name_entry.insert(0, display_name)
            new_value_entry.delete(0, tk.END)
            new_value_entry.insert(0, var_value)
            update_new_values()
            reset_btn.config(bg="#9E9E9E", text="Reset")
        
        reset_btn = tk.Button(format_frame, text="Reset", command=reset_to_original, 
                             bg="#9E9E9E", fg="white", font=("Arial", 7), padx=8, pady=1)
        reset_btn.pack(side=tk.RIGHT, padx=2)
        
        # New color preview section
        new_preview_frame = tk.Frame(card_frame, bg="white")
        new_preview_frame.pack(side=tk.RIGHT, fill=tk.BOTH, padx=10, pady=10)
        
        tk.Label(new_preview_frame, text="New Preview", font=("Arial", 9, "bold"), bg="white", fg="#4CAF50").pack()
        
        new_preview_canvas = tk.Canvas(new_preview_frame, width=100, height=60, bg="white", highlightthickness=1, highlightbackground="#ccc")
        new_preview_canvas.pack(pady=5)
        
        # Initialize with current value
        self.update_new_preview(new_preview_canvas, var_value)
        
        # Display new name and value
        new_name_label = tk.Label(new_preview_frame, text=display_name, font=("Arial", 9, "bold"), bg="white", wraplength=100, justify=tk.CENTER)
        new_name_label.pack()
        
        new_value_label = tk.Label(new_preview_frame, text=var_value[:50] + "..." if len(var_value) > 50 else var_value, 
                                   font=("Arial", 7, "italic"), bg="white", fg="#666", wraplength=100, justify=tk.CENTER)
        new_value_label.pack()
        
        # Store references for later use
        def update_new_values(*args):
            new_name = new_name_entry.get().strip()
            new_value = new_value_entry.get().strip()
            
            # Update preview
            self.update_new_preview(new_preview_canvas, new_value)
            
            # Update new name and value display
            new_name_label.config(text=new_name if new_name else "")
            new_value_label.config(text=new_value[:50] + "..." if len(new_value) > 50 else new_value)
            
            if new_name and new_value:
                # Update the new_colors_data with the simple name
                # The namespace will be prepended when applying changes
                if var_name in self.new_colors_data:
                    del self.new_colors_data[var_name]
                self.new_colors_data[new_name] = new_value
            
            update_btn.config(bg="#4CAF50")
            update_btn.config(text="✓ Updated")
        
        new_name_entry.bind("<KeyRelease>", update_new_values)
        new_value_entry.bind("<KeyRelease>", update_new_values)
        
        # Store entry references for bulk updates
        self.color_entries.append({
            'var_name': var_name,
            'new_name_entry': new_name_entry,
            'new_value_entry': new_value_entry,
            'update_callback': update_new_values,
            'update_btn': None  # Will be set below
        })
        
        # Update button (visual feedback)
        button_frame = tk.Frame(edit_frame, bg="white")
        button_frame.pack(anchor=tk.W, pady=(5, 0))
        
        update_btn = tk.Button(button_frame, text="Mark for Update", command=update_new_values, 
                               bg="#FF9800", fg="white", font=("Arial", 8), padx=10, pady=3)
        update_btn.pack(side=tk.LEFT)
        
        # Store the button reference as well
        if self.color_entries and self.color_entries[-1]['var_name'] == var_name:
            self.color_entries[-1]['update_btn'] = update_btn
        
        # Add separator
        separator = tk.Frame(self.scrollable_frame, bg="#e0e0e0", height=1)
        separator.pack(fill=tk.X, padx=0)
    
    def mark_all_for_update(self):
        """Mark all colors for update by triggering their update callbacks"""
        log_section("📍 MARKING ALL FOR UPDATE")
        log_step(f"Marking {len(self.color_entries)} color(s) for update...", "⏱")
        
        updated_count = 0
        for entry_info in self.color_entries:
            try:
                # Trigger the update callback for each color
                entry_info['update_callback']()
                updated_count += 1
                log_info(f"  Marked: {entry_info['var_name']}", "✓")
            except Exception as e:
                log_error(f"  Error marking {entry_info['var_name']}: {str(e)}", "⚠")
        
        log_success(f"All {updated_count} color(s) marked for update!", "✨")
    
    def update_new_preview(self, canvas: tk.Canvas, value: str):
        """Update the preview canvas with new color value"""
        canvas.delete("all")
        
        if not value.strip():
            canvas.configure(bg="#e0e0e0")
            return
        
        is_gradient = self.is_gradient(value)
        
        if is_gradient:
            self.draw_gradient_preview(canvas, value)
        else:
            color = self.extract_rgb_color(value)
            if color:
                canvas.configure(bg=color)
            else:
                canvas.configure(bg="#e0e0e0")
    
    def is_gradient(self, value: str) -> bool:
        """Check if value is a gradient"""
        return bool(re.search(r'(linear-gradient|radial-gradient|conic-gradient)', value, re.IGNORECASE))
    
    def extract_rgb_color(self, value: str) -> str:
        """Extract rgb color and convert to hex"""
        if not value or not value.strip():
            return None
        
        # Look for rgb(...) pattern
        rgb_match = re.search(r'rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)', value)
        if rgb_match:
            r, g, b = int(rgb_match.group(1)), int(rgb_match.group(2)), int(rgb_match.group(3))
            return f'#{r:02x}{g:02x}{b:02x}'
        
        # Look for hsl(...) pattern
        hsl_match = re.search(r'hsl\(\s*(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?\s*\)', value)
        if hsl_match:
            h, s, l = int(hsl_match.group(1)), int(hsl_match.group(2)), int(hsl_match.group(3))
            # Convert HSL to RGB
            h = h / 360.0
            s = s / 100.0
            l = l / 100.0
            r, g, b = colorsys.hls_to_rgb(h, l, s)
            return f'#{int(r*255):02x}{int(g*255):02x}{int(b*255):02x}'
        
        # Look for hex color
        hex_match = re.search(r'#[0-9a-fA-F]{6}', value)
        if hex_match:
            return hex_match.group(0)
        
        return None
    
    def hex_to_rgb(self, hex_color: str) -> str:
        """Convert hex color to rgb format"""
        hex_color = hex_color.lstrip('#')
        r = int(hex_color[0:2], 16)
        g = int(hex_color[2:4], 16)
        b = int(hex_color[4:6], 16)
        return f'rgb({r}, {g}, {b})'
    
    def hex_to_hsl(self, hex_color: str) -> str:
        """Convert hex color to hsl format"""
        hex_color = hex_color.lstrip('#')
        r = int(hex_color[0:2], 16) / 255.0
        g = int(hex_color[2:4], 16) / 255.0
        b = int(hex_color[4:6], 16) / 255.0
        h, l, s = colorsys.rgb_to_hls(r, g, b)
        return f'hsl({int(h*360)}, {int(s*100)}%, {int(l*100)}%)'
    
    def get_display_name(self, var_name: str) -> str:
        """Extract display name from full color variable name"""
        # Remove --color-{namespace}- prefix if it exists
        match = re.match(r'--color-[A-Za-z0-9]+-(.+)', var_name)
        if match:
            return match.group(1)
        # For non-color variables, remove -- prefix
        return var_name.lstrip('-')
    
    def get_namespace_from_name(self, var_name: str) -> str:
        """Extract namespace from color variable name"""
        match = re.match(r'--color-([A-Za-z0-9]+)-', var_name)
        if match:
            return match.group(1)
        return "color"
    
    def draw_gradient_preview(self, canvas: tk.Canvas, gradient_value: str):
        """Draw a simplified gradient preview"""
        try:
            # Extract colors from gradient
            colors = re.findall(r'rgba?\([^)]+\)', gradient_value)
            
            if not colors:
                canvas.create_text(50, 30, text="No Colors", font=("Arial", 7), fill="#666")
                return
            
            # Create a simple gradient preview
            width = canvas.winfo_width() if canvas.winfo_width() > 1 else 100
            height = canvas.winfo_height() if canvas.winfo_height() > 1 else 60
            
            if width <= 1:
                width = 100
            if height <= 1:
                height = 60
            
            # Convert colors to hex
            hex_colors = []
            for color_str in colors[:4]:  # Limit to 4 colors for preview
                rgb_match = re.search(r'rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)', color_str)
                if rgb_match:
                    r, g, b = int(rgb_match.group(1)), int(rgb_match.group(2)), int(rgb_match.group(3))
                    hex_colors.append(f'#{r:02x}{g:02x}{b:02x}')
            
            if hex_colors:
                # Draw gradient from left to right
                color_count = len(hex_colors)
                section_width = width // color_count
                
                for i, color in enumerate(hex_colors):
                    x1 = i * section_width
                    x2 = x1 + section_width if i < color_count - 1 else width
                    canvas.create_rectangle(x1, 0, x2, height, fill=color, outline="")
                
                canvas.create_rectangle(0, 0, width, height, outline="#ccc", width=1)
            else:
                canvas.create_text(50, 30, text="Gradient", font=("Arial", 7), fill="#666")
        
        except Exception as e:
            print(f"Error drawing gradient: {str(e)}")
            canvas.create_text(50, 30, text="Error", font=("Arial", 7), fill="#666")
    
    def apply_all_changes(self):
        """Apply all color name and value changes"""
        if not self.colors_data:
            messagebox.showwarning("No Data", "No colors loaded. Please scan a directory first.")
            return
        
        # Check if there are any changes
        changes_made = False
        for old_name, new_name in zip(sorted(self.colors_data.keys()), sorted(self.new_colors_data.keys())):
            if old_name != new_name or self.colors_data[old_name] != self.new_colors_data[new_name]:
                changes_made = True
                break
        
        if not changes_made:
            messagebox.showinfo("No Changes", "No changes detected. Edit color names or values to make updates.")
            return
        
        try:
            log_section("🚀 APPLYING ALL CHANGES")
            # Show confirmation dialog
            if messagebox.askyesno("Confirm Changes", 
                                   f"This will update:\n1. Color values in root.scss\n2. Color names in all files\n\nContinue?"):
                
                log_step("Initializing replacement process...", "⚙")
                # Apply changes
                self.process_replacements()
                log_success("All changes have been applied successfully!", "🎉")
                messagebox.showinfo("Success", "All changes have been applied successfully!")
        
        except Exception as e:
            log_error(f"Error during application: {str(e)}", "💥")
            messagebox.showerror("Error", f"An error occurred while applying changes: {str(e)}")
    
    def process_replacements(self):
        """Process all color name and value replacements including -rgb variants"""
        # Get the namespace from input
        namespace = self.namespace_input.get().strip()
        
        if not namespace:
            messagebox.showwarning("No Namespace", "Please enter a namespace to prepend to color names")
            return
        
        if not re.match(r'^[A-Za-z0-9]+$', namespace):
            messagebox.showwarning("Invalid Namespace", "Namespace can only contain letters and numbers")
            return
        
        log_step(f"Using namespace: {Colors.BOLD}{namespace}{Colors.ENDC}", "🏷")
        
        # Build mapping of old names to new names with namespace
        name_mapping = {}
        value_mapping = {}
        
        log_step("Building replacement mappings...", "🔨")
        mapping_count = 0
        
        # Build a lookup of edited colors from color_entries
        edited_colors = {}
        for entry in self.color_entries:
            var_name = entry['var_name']
            new_name = entry['new_name_entry'].get().strip()
            new_value = entry['new_value_entry'].get().strip()
            if new_name or new_value:
                edited_colors[var_name] = {
                    'new_name': new_name if new_name else self.get_display_name(var_name),
                    'new_value': new_value if new_value else self.colors_data.get(var_name, "")
                }
        
        for old_var_name, old_value in self.colors_data.items():
            # Check if this color was edited
            if old_var_name in edited_colors:
                edit_info = edited_colors[old_var_name]
                new_simple_name = edit_info['new_name']
                new_value = edit_info['new_value']
            else:
                # Use original values
                new_simple_name = self.get_display_name(old_var_name)
                new_value = old_value
            
            # Build full new name with namespace
            full_new_name = f"--color-{namespace}-{new_simple_name}"
            
            if old_var_name != full_new_name:
                name_mapping[old_var_name] = full_new_name
                log_info(f"  {old_var_name} → {full_new_name}", "🔄")
                mapping_count += 1
                
                # Also create mapping for -rgb variant
                rgb_old_name = old_var_name + "-rgb"
                rgb_new_name = full_new_name + "-rgb"
                name_mapping[rgb_old_name] = rgb_new_name
                log_info(f"  {rgb_old_name} → {rgb_new_name}", "🔄")
                mapping_count += 1
            
            if old_value != new_value:
                value_mapping[old_var_name] = (full_new_name, new_value)
                log_info(f"  {old_var_name}: {old_value[:40]}... → {new_value[:40]}...", "🎨")
                mapping_count += 1
                # Also add mapping for -rgb variant value
                value_mapping[old_var_name + "-rgb"] = (full_new_name + "-rgb", new_value)
                mapping_count += 1
        
        log_success(f"Created {mapping_count} replacement mapping(s)", "📋")
        
        # Get the base directory that was scanned (use current_directory instead of deriving from scss paths)
        base_directory = self.current_directory.get()
        
        if not base_directory:
            log_error("No base directory selected", "💥")
            messagebox.showerror("Error", "No directory selected")
            return
        
        log_step(f"Updating {len(self.scss_file_paths)} root.scss file(s)...", "💾")
        # Step 1: Update root.scss files with new values and names
        for scss_path in self.scss_file_paths:
            self.update_scss_file(scss_path, value_mapping, name_mapping)
        
        log_step(f"Scanning all directories and subdirectories for name replacements: {base_directory}", "🔍")
        # Step 2: Replace color names in all files in all subdirectories of the base directory
        self.replace_color_names_in_directory(base_directory, name_mapping)
    
    def update_scss_file(self, scss_path: str, value_mapping: Dict, name_mapping: Dict):
        """Update root.scss file with new color values and names"""
        try:
            log_step(f"Processing: {scss_path}", "📝")
            
            with open(scss_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            replacements_made = 0
            
            # First, update values for both base and -rgb variants
            for old_name, (new_name, new_value) in value_mapping.items():
                # Pattern to find the variable definition (handles both base and -rgb)
                pattern = rf'({re.escape(old_name)})\s*:\s*[^;]+;'
                if re.search(pattern, content):
                    replacement = f"{new_name}: {new_value};"
                    content = re.sub(pattern, replacement, content)
                    log_info(f"  ✎ Value updated: {old_name}", "📄")
                    replacements_made += 1
            
            # Then update name mappings for any remaining variables
            for old_name, new_name in name_mapping.items():
                if old_name not in value_mapping:  # If not already updated
                    pattern = rf'({re.escape(old_name)})\s*:'
                    if re.search(pattern, content):
                        replacement = f"{new_name}:"
                        content = re.sub(pattern, replacement, content)
                        log_info(f"  ✎ Name updated: {old_name} → {new_name}", "📄")
                        replacements_made += 1
            
            if content != original_content:
                with open(scss_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                log_success(f"Saved with {replacements_made} change(s)", "💾")
            else:
                log_warning("No changes needed for this file", "ℹ")
        
        except Exception as e:
            log_error(f"Error updating {scss_path}: {str(e)}", "💥")
    
    def replace_color_names_in_directory(self, directory: str, name_mapping: Dict):
        """Replace color variable names in all files within directory and subdirectories"""
        try:
            log_step(f"Scanning all directories and subdirectories: {directory}", "📂")
            file_count = 0
            updated_count = 0
            
            # Directories to skip
            skip_dirs = {'.git', '.gitignore', 'node_modules', '.venv', 'venv', '__pycache__', 
                        '.pytest_cache', '.next', 'dist', 'build', '.DS_Store'}
            
            # File extensions to skip (binary files)
            skip_extensions = {'.pyc', '.pyo', '.so', '.dll', '.exe', '.jar', '.zip', '.tar', 
                             '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.webp', '.pdf',
                             '.ttf', '.woff', '.woff2', '.eot', '.mp3', '.mp4', '.webm', '.mov'}
            
            for root, dirs, files in os.walk(directory):
                # Remove skip_dirs from the dirs list in-place to prevent os.walk from descending
                dirs[:] = [d for d in dirs if d not in skip_dirs]
                
                for file in files:
                    # Skip binary and unnecessary file types
                    if any(file.endswith(ext) for ext in skip_extensions):
                        continue
                    
                    file_path = os.path.join(root, file)
                    file_count += 1
                    if self.replace_color_names_in_file(file_path, name_mapping):
                        updated_count += 1
            
            log_success(f"Processed {file_count} file(s), updated {updated_count}", "✓")
        
        except Exception as e:
            log_error(f"Error processing directory {directory}: {str(e)}", "💥")
    
    def replace_color_names_in_file(self, file_path: str, name_mapping: Dict) -> bool:
        """Replace color variable names in a single file. Returns True if file was modified."""
        try:
            # Read file
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            
            original_content = content
            replacements_made = 0
            
            # Sort by length (longest first) to avoid partial replacements
            sorted_mappings = sorted(name_mapping.items(), key=lambda x: len(x[0]), reverse=True)
            
            # Replace each color name
            for old_name, new_name in sorted_mappings:
                # Only replace if old_name starts with "--" and is not empty
                if old_name.strip() and old_name.startswith("--"):
                    # Use negative lookahead and lookbehind to match CSS variable names properly
                    # This ensures we don't match partial variable names
                    pattern = r'(?<![a-zA-Z0-9\-])' + re.escape(old_name) + r'(?![a-zA-Z0-9\-])'
                    if re.search(pattern, content):
                        log_info(f"    Replacing CSS var: {old_name} → {new_name}", "🔄")
                        content = re.sub(pattern, new_name, content)
                        replacements_made += 1
                    
                    # Also replace Tailwind class names (without the -- prefix and --color- prefix)
                    # e.g., --color-NOTOTEKA-fipu-red-default becomes NOTOTEKA-fipu-red-default for Tailwind classes
                    if old_name.startswith("--color-"):
                        tailwind_old = old_name[8:]  # Remove "--color-" prefix
                        tailwind_new = new_name[8:]  # Remove "--color-" prefix from new name
                        
                        # Handle Tailwind class references (can have variant prefixes like dark:, hover:, focus-within:, etc.)
                        # Use word boundary at start, and negative lookahead to prevent matching longer variants
                        # e.g., don't match "NOTOTEKA-fipu-red-default" when we should match "NOTOTEKA-fipu-red-default-rgb"
                        tailwind_pattern = r'\b' + re.escape(tailwind_old) + r'(?![a-zA-Z0-9])'
                        
                        if re.search(tailwind_pattern, content):
                            log_info(f"    Replacing Tailwind: {tailwind_old} → {tailwind_new}", "🎨")
                            content = re.sub(tailwind_pattern, tailwind_new, content)
                            replacements_made += 1
            
            # Write back if changed
            if content != original_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                log_success(f"Updated: {file_path} ({replacements_made} replacement(s))", "📝")
                return True
        
        except Exception as e:
            log_error(f"Error updating file {file_path}: {str(e)}", "💥")
        
        return False


if __name__ == "__main__":
    root = tk.Tk()
    app = ThemeMaker(root)
    root.mainloop()
