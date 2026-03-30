import React, { useEffect, useState, useRef } from 'react'
import './App.css'

const App: React.FC = () => {
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    
    // Terminal State
    const [terminalHistory, setTerminalHistory] = useState<string[]>([
        "Welcome to VRAJESH_ARCHIVE [v2.4.0]",
        "System: AI_AUTOMATION_OS_ACTIVE",
        "Type 'help' to see available commands."
    ]);
    const [currentInput, setCurrentInput] = useState("");
    const terminalContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const updateCursor = (e: MouseEvent) => {
            setCursorPos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', updateCursor);
        return () => window.removeEventListener('mousemove', updateCursor);
    }, []);

    useEffect(() => {
        if (terminalContainerRef.current) {
            terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
        }
    }, [terminalHistory]);

    const handleHover = (enter: boolean) => setIsHovering(enter);

    const processCommand = (cmd: string) => {
        const cleanCmd = cmd.trim().toLowerCase();
        let response: string[] = [];

        switch (cleanCmd) {
            case 'help':
                response = [
                    "AVAILABLE_COMMANDS:",
                    "  about      - Profile summary & Education",
                    "  exp        - Career timeline",
                    "  skills     - Full tech stack overview",
                    "  projects   - Portfolio highlights",
                    "  contact    - Direct contact links",
                    "  clear      - Reset terminal screen",
                    "  help       - Show this menu"
                ];
                break;
            case 'about':
                response = [
                    "NAME: VRAJESH PATEL",
                    "ROLE: Business Automation Engineer / AI Specialist",
                    "EDUCATION: Parul University [Grad. 2024]",
                    "LOCATION: Gujarat, India",
                    "BIO: We automate the ephemeral into structural permanence. Merging traditional engineering with modern AI Ops."
                ];
                break;
            case 'exp':
                response = [
                    "CAREER_TIMELINE:",
                    "  [NOW] AI & AUTOMATION ENGINEER @ SSPACIA INDIA",
                    "  [2024-26] FULL STACK DEVELOPER @ RND TECHNOSOFT",
                    "  [2024] B.TECH GRADUATE @ PARUL UNIVERSITY"
                ];
                break;
            case 'skills':
                response = [
                    "TECH_STACK_TRACE:",
                    "  CORE: AWS, Docker, n8n, MySQL, Git",
                    "  AI: OpenAI, Claude, Gemini, Hugging Face, Ollama",
                    "  DEV: Python, JS, TS, Java, Next.js, Spring Boot",
                    "  TOOLS: Antigravity, VS Code, Postman"
                ];
                break;
            case 'projects':
                response = [
                    "PROJECT_LOGS:",
                    "  1. MONOLITHIC_ARCHIVE - Industrial Portfolio",
                    "  2. VOID_AUTOMATION_v1 - AI Workflow System",
                    "  3. CLAUDE_OLLAMA_TUNNEL - Local LLM Orchestration"
                ];
                break;
            case 'contact':
                response = [
                    "OUTBOUND_SIGNALS:",
                    "  EMAIL    - vrajeshpatel2990@gmail.com",
                    "  PHONE    - +91-9081820189",
                    "  GITHUB   - github.com/VrajeshPatel02",
                    "  LINKEDIN - linkedin.com/in/vrajesh-patel-004171243/"
                ];
                break;
            case 'clear':
                setTerminalHistory([]);
                return;
            case '':
                break;
            default:
                response = [`COMMAND_NOT_FOUND: '${cleanCmd}'. Type 'help' for assistance.`];
        }

        setTerminalHistory(prev => [...prev, `> ${cmd}`, ...response]);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            processCommand(currentInput);
            setCurrentInput("");
        }
    };

    return (
        <div className="portfolio-app" onClick={() => inputRef.current?.focus()}>
            <div 
                id="custom-cursor" 
                className={isHovering ? 'hovering' : ''}
                style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
            />

            <nav className="nav-bar container-full">
                <div className="nav-container">
                    <div className="nav-logo" onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>
                        VRAJESH_PATEL.cli
                    </div>
                    <div className="nav-links">
                        <a href="#about" onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>_ABOUT</a>
                        <a href="#experience" onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>_EXPERIENCE</a>
                        <a href="#stack" onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>_STACK</a>
                        <a href="#projects" onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>_PROJECTS</a>
                        <a href="#contact" className="nav-contact-btn" onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>CONTACT.CMD</a>
                    </div>
                </div>
            </nav>

            <main className="container">
                {/* Hero Section */}
                <section className="hero-section animate-slide-up">
                    <div className="hero-grid">
                        <div className="hero-text">
                            <h1 className="hero-title">
                                Automated <br /> Portfolio <br /> <span>Archive.</span>
                            </h1>
                            <p className="hero-description">
                                A high-fidelity command interface designed for zero-latency implementation. Specialized in Business Automation and AI Engineering.
                            </p>
                            <div className="hero-actions">
                                <button className="btn-primary" onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>
                                    INITIALIZE_TERMINAL
                                </button>
                                <div className="sub-label">LOCATION: GUJARAT, INDIA // SYSTEM_NOMINAL</div>
                            </div>
                        </div>

                        <div className="hero-visual">
                            {/* Interactive Terminal Component */}
                            <div className="terminal-block hard-shadow main-terminal">
                                <div className="terminal-header">
                                    <div className="terminal-control"></div>
                                    <div className="terminal-control"></div>
                                    <div className="terminal-control"></div>
                                    <span className="terminal-filepath">VRAJESH@ARCHIVE_SYS:~$</span>
                                </div>
                                <div className="terminal-content custom-scrollbar" ref={terminalContainerRef}>
                                    {terminalHistory.map((line, idx) => (
                                        <p key={idx} className="mono terminal-line">{line}</p>
                                    ))}
                                    <div className="terminal-input-line">
                                        <span className="prompt">VRAJESH@CLI:~$</span>
                                        <input 
                                            ref={inputRef}
                                            type="text" 
                                            value={currentInput}
                                            onChange={(e) => setCurrentInput(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            className="terminal-input-active"
                                            autoFocus
                                            spellCheck="false"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section className="about-section section-spacing animate-slide-up" id="about">
                    <div className="section-header">
                        <h2>_ABOUT.EXE</h2>
                        <div className="section-line"></div>
                    </div>
                    <div className="brutalist-grid-layout">
                        <div className="about-text-content brutalist-border interactive padding-md">
                            <p className="large-text">
                                We automate the ephemeral into <span className="highlight-petroleum">structural permanence</span>.
                            </p>
                            <p className="body-text">
                                Merging traditional engineering with modern AI. I build high-fidelity workflows using <span className="highlight-amber">n8n, OpenAI, and Hugging Face</span> to scale architectural intent beyond the screen.
                            </p>
                        </div>
                        <div className="about-visual-overlay brutalist-border hard-shadow">
                            <img src="/tech-grid.png" alt="Tech Grid" className="about-tech-image" />
                            <div className="about-stats-block-overlay">
                                <div className="stat-card padding-sm interactive">
                                    <span className="label">University</span>
                                    <span className="stat-val">PARUL_U</span>
                                </div>
                                <div className="stat-card padding-sm interactive">
                                    <span className="label">Hiring_Status</span>
                                    <span className="stat-val">OPEN</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Experience Section */}
                <section className="experience-section section-spacing animate-slide-up" id="experience">
                    <div className="section-header">
                        <h2>_EXPERIENCE.DAT</h2>
                        <div className="section-line"></div>
                    </div>
                    <div className="timeline-container">
                        {[
                            { year: 'NOW', role: 'AI & AUTOMATION ENGINEER', company: 'SSPACIA INDIA PVT. LTD.', desc: 'Developing high-level automation systems and AI solutions.' },
                            { year: '2024-26', role: 'FULL STACK DEVELOPER', company: 'RND TECHNOSOFT', desc: 'Managed end-to-end full stack development for enterprise applications.' },
                        ].map((item, idx) => (
                            <div key={idx} className="timeline-item brutalist-border padding-md interactive">
                                <div className="timeline-year">{item.year}</div>
                                <div className="timeline-details">
                                    <h3>{item.role} // {item.company}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Tech Stack Section */}
                <section className="tech-section section-spacing animate-slide-up" id="stack">
                    <div className="section-header">
                        <h2>_STACK_TRACE</h2>
                        <div className="section-line"></div>
                    </div>
                    <div className="tech-stack-grid">
                        {['AWS', 'DOCKER', 'PYTHON', 'JAVASCRIPT', 'TYPESCRIPT', 'HTML', 'CSS', 'JAVA', 'NEXT_JS', 'SPRING_BOOT', 'GITHUB', 'GIT', 'OPENAI', 'CLAUDE', 'GEMINI', 'N8N', 'MYSQL', 'HUGGING_FACE', 'ANTIGRAVITY', 'OLLAMA'].map((tech) => (
                            <div key={tech} className="tech-chip brutalist-border hard-shadow-amber padding-sm interactive" onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>
                                {tech}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Projects Section */}
                <section className="projects-grid section-spacing animate-slide-up" id="projects">
                    <div className="section-header">
                        <h2>_PROJECTS.LOG</h2>
                        <div className="section-line"></div>
                    </div>
                    <div className="project-layout-v2">
                        <div className="project-card interactive brutalist-border hard-shadow">
                            <div className="project-image-container">
                                <img src="/hero-image.png" alt="Project v1" className="project-image" />
                                <div className="project-overlay">
                                    <div className="project-label">AI_AUTOMATION</div>
                                </div>
                            </div>
                            <div className="project-info">
                                <h3>VOID_AUTOMATION_v1</h3>
                                <p>A high-performance automated workflow system designed for zero-latency business scaling.</p>
                                <button className="btn-secondary" onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>VIEW ARCHIVE</button>
                            </div>
                        </div>
                        
                        <div className="project-side-cards">
                            <div className="project-card interactive brutalist-border padding-md">
                                <span className="label">LLM_OPS_02</span>
                                <h3>CLAUDE_OLLAMA_TUNNEL</h3>
                                <p>Custom integration for local LLM orchestration and secure tunneling.</p>
                            </div>
                            <div className="project-card interactive brutalist-border padding-md">
                                <span className="label">STACK_DEPLOY_03</span>
                                <h3>SPRING_NEXT_CORE</h3>
                                <p>Architectural blueprint for scalable spring-boot and next.js microservices.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="contact-section section-spacing animate-slide-up" id="contact">
                    <div className="section-header">
                        <h2>_CONTACT.CMD</h2>
                        <div className="section-line"></div>
                    </div>
                    <div className="contact-container brutalist-border terminal-block hard-shadow">
                        <div className="terminal-header">
                            <div className="terminal-control"></div>
                            <div className="terminal-control"></div>
                            <div className="terminal-control"></div>
                            <span className="terminal-filepath">SIGNAL_ENTRY/OUTBOUND</span>
                        </div>
                        <div className="terminal-content">
                            <div className="contact-details-grid">
                                <div className="contact-item">
                                    <span className="label">EMAIL</span>
                                    <a href="mailto:vrajeshpatel2990@gmail.com" onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>vrajeshpatel2990@gmail.com</a>
                                </div>
                                <div className="contact-item">
                                    <span className="label">PHONE</span>
                                    <a href="tel:9081820189" onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>+91-9081820189</a>
                                </div>
                                <div className="contact-item">
                                    <span className="label">SOCIALS</span>
                                    <div className="social-links">
                                        <a href="https://github.com/VrajeshPatel02" target="_blank" rel="noopener noreferrer" onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>GITHUB</a>
                                        <a href="https://www.linkedin.com/in/vrajesh-patel-004171243/" target="_blank" rel="noopener noreferrer" onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>LINKEDIN</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="footer brutalist-border container-full">
                <div className="footer-content">
                    <div>© [2026] VRAJESH PATEL. ALL RIGHTS RESERVED_BY_ARCHIVE.</div>
                    <div>[LOC: GUJARAT, INDIA]</div>
                    <div className="uptime-indicator">
                        <div className="dot"></div> STATUS_NOMINAL
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default App
