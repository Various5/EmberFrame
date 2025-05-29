from setuptools import setup, find_packages

setup(
    name="embercore",
    version="1.0.0",
    description="Multi-User Desktop Application - EmberCore",
    author="EmberCore Team",
    author_email="contact@embercore.com",
    packages=find_packages(),
    install_requires=[
        "Flask>=2.3.0",
        "Flask-SQLAlchemy>=3.0.0",
        "Flask-Login>=0.6.0",
        "Flask-WTF>=1.1.0",
        "Flask-SocketIO>=5.3.0",
        "Werkzeug>=2.3.0",
        "python-socketio>=5.8.0",
        "bcrypt>=4.0.0",
        "python-dotenv>=1.0.0",
        "redis>=4.5.0",
        "Pillow>=10.0.0",
        "python-magic>=0.4.27",
        "colorlog>=6.7.0",
    ],
    extras_require={
        "dev": [
            "pytest>=7.0.0",
            "pytest-flask>=1.2.0",
            "black>=23.0.0",
            "flake8>=6.0.0",
        ]
    },
    entry_points={
        "console_scripts": [
            "embercore=run:main",
        ],
    },
    python_requires=">=3.8",
    classifiers=[
        "Development Status :: 4 - Beta",
        "Intended Audience :: End Users/Desktop",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3.8+",
    ],
)