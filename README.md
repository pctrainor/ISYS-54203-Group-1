# ISYS-54203-Group-1

Project folder for ISYS 54203 Group 1

https://pctrainor.github.io/ISYS-54203-Group-1/

# GitHub Actions Workflow for Code Quality and Security

This repository uses GitHub Actions to automate code quality checks and security scanning on every pull request to the `main` branch!

## Workflow Details

The workflow consists of **six** separate jobs that run in parallel:

- **`lint-css`:** Lints CSS files using Stylelint to ensure consistent code style and catch potential errors.
- **`lint-html`:** Lints HTML files using HTMLHint to identify potential issues and enforce best practices.
- **`check-links`:** Checks for broken links within the project using Lychee. This helps maintain the integrity of the website and prevent users from encountering dead ends.
- **`security-scan`:** Scans the project for vulnerabilities using Trivy. This helps identify and address potential security risks early in the development process.
- **`spell-checker`:** Checks for spelling errors in code comments, documentation, and commit messages using cspell. This ensures clear communication and professionalism.
- **`accessibility-test`:**  Tests the accessibility of your website using Pa11y, helping to ensure it's usable by people with disabilities.

## How it Works

1. **Trigger:** The workflow is triggered automatically whenever a pull request is opened against the `main` branch.
2. **Jobs:** Each job runs on a separate Ubuntu virtual machine.
3. **Steps:** Each job consists of a series of steps, including:
   - **Checkout:** Checks out the code from the repository.
   - **Install Dependencies:** Installs the necessary tools for each job (e.g., Stylelint, HTMLHint, Lychee, Trivy, cspell, Pa11y).
   - **Run Checks:** Executes the respective linting, scanning, or testing tool.
4. **Reporting:** The results of each job are displayed in the "Actions" tab of the pull request. Any errors or warnings will be highlighted, allowing developers to address them before merging the code.

## Benefits

- **Automated Quality Control:** Ensures consistent code style and quality across the project.
- **Early Issue Detection:** Identifies potential errors, vulnerabilities, and accessibility issues before they reach production.
- **Improved Security:** Helps protect the project from security threats.
- **Enhanced Accessibility:**  Ensures the website is inclusive and usable by everyone.
- **Streamlined Workflow:** Automates tedious tasks, freeing up developers to focus on more important work.
- **Improved Communication:**  Automated spell checking promotes clear and professional communication.


## Contributing

If you'd like to contribute to this workflow, please feel free to submit a pull request. We welcome any improvements or suggestions!
