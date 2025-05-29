import json
import logging
from app import db

logger = logging.getLogger(__name__)


class ThemeService:

    def __init__(self):
        self.available_themes = {
            'ember_red': {
                'name': 'Ember Red',
                'primary_color': '#ff4500',
                'secondary_color': '#dc143c',
                'accent_color': '#ff6347',
                'background': 'linear-gradient(135deg, #1a0a00 0%, #2d1a0a 100%)',
                'description': 'Fiery red ember theme with burning aesthetics'
            },
            'ember_orange': {
                'name': 'Ember Orange',
                'primary_color': '#ff8c00',
                'secondary_color': '#ff4500',
                'accent_color': '#ffa500',
                'background': 'linear-gradient(135deg, #1a1000 0%, #2d1a00 100%)',
                'description': 'Warm orange glow with ember particles'
            },
            'cyber_blue': {
                'name': 'Cyber Blue',
                'primary_color': '#00ffff',
                'secondary_color': '#0066ff',
                'accent_color': '#ff00ff',
                'background': 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)',
                'description': 'Classic cyberpunk with electric blue accents'
            },
            'matrix_green': {
                'name': 'Matrix Green',
                'primary_color': '#00ff00',
                'secondary_color': '#008800',
                'accent_color': '#ffff00',
                'background': 'linear-gradient(135deg, #000000 0%, #001100 100%)',
                'description': 'Classic matrix digital rain theme'
            },
            'neon_purple': {
                'name': 'Neon Purple',
                'primary_color': '#8000ff',
                'secondary_color': '#4000cc',
                'accent_color': '#ff0080',
                'background': 'linear-gradient(135deg, #0a0010 0%, #1a1030 100%)',
                'description': 'Deep purple with electric highlights'
            },
            'ice_blue': {
                'name': 'Ice Blue',
                'primary_color': '#80e0ff',
                'secondary_color': '#4080ff',
                'accent_color': '#ffffff',
                'background': 'linear-gradient(135deg, #050510 0%, #101530 100%)',
                'description': 'Cool ice blue with arctic vibes'
            }
        }

    def get_available_themes(self):
        """Get all available themes"""
        return self.available_themes

    def get_theme_config(self, theme_name):
        """Get configuration for a specific theme"""
        return self.available_themes.get(theme_name, self.available_themes['ember_red'])

    def set_user_theme(self, user, theme_name):
        """Set theme for a user"""
        if theme_name not in self.available_themes:
            logger.warning(f"Invalid theme requested: {theme_name}")
            return False

        try:
            user.theme = theme_name
            db.session.commit()
            logger.info(f"Updated theme for user {user.username} to {theme_name}")
            return True
        except Exception as e:
            db.session.rollback()
            logger.error(f"Failed to update theme for user {user.username}: {e}")
            return False

    def get_default_layout(self):
        """Get default desktop layout"""
        return {
            'icons': {
                'file-explorer': {'x': 50, 'y': 50},
                'terminal': {'x': 50, 'y': 150},
                'games': {'x': 50, 'y': 250},
                'calculator': {'x': 50, 'y': 350},
                'text-editor': {'x': 150, 'y': 50},
                'settings': {'x': 150, 'y': 150}
            },
            'wallpaper': 'default_ember.jpg',
            'taskbar_position': 'bottom',
            'icon_size': 'medium'
        }