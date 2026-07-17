import React from 'react'
import "./About_Page.css"

const About_FRame = ({ Frame_Title }) => {
    return (
        <div className='Personalize_main_frame'>
            <div className="Personalize_main_frame_cont">
                <div className="Menu_Feature_Title_frame">
                    <p>{Frame_Title}</p>
                </div>

                <div className="Meanu_Feature_Main_Frame_Cont">
                    <div className="Meanu_Feature_Main_Frame_Cont_ color-White">

                        <h2 className="title">✨ Welcome to <span className="highlight">Pentrilon</span></h2>
                        <p>
                            <span className="highlight">Pentrilon</span> is your <span className="emphasis">intelligent AI agent</span>
                            designed to seamlessly perform tasks on your PC. Whether it’s
                            <span className="emphasis">automating workflows</span>, <span className="emphasis">managing files</span>,
                            or <span className="emphasis">boosting productivity</span>, Pentrilon adapts to your needs and empowers you to
                            <span className="highlight">work smarter</span>.
                        </p>
                        <p>
                            With a <span className="emphasis">sleek interface</span> and <span className="emphasis">powerful backend</span>,
                            Pentrilon bridges the gap between <span className="highlight">human intent</span> and
                            <span className="highlight">machine execution</span>. It’s not just an assistant — it’s your
                            <span className="emphasis">digital partner in efficiency</span>.
                        </p>

                        <h2 className="subtitle">🚀 Key Features of <span className="highlight">Pentrilon</span></h2>
                        <ul className="features">
                            <li><strong>⚡ Task Automation:</strong> Execute repetitive PC tasks with ease.</li>
                            <li><strong>📂 Smart File Management:</strong> Organize, search, and manipulate files intelligently.</li>
                            <li><strong>🔗 System Integration:</strong> Works across applications and adapts to your workflow.</li>
                            <li><strong>🎨 User-Centric Design:</strong> Simple, intuitive interface with customizable options.</li>
                            <li><strong>🤖 AI-Powered Assistance:</strong> Learns from your usage patterns to provide tailored support.</li>
                        </ul>
                        <p>
                            <span className="highlight">Pentrilon</span> is built to be <span className="emphasis">modular</span>,
                            <span className="emphasis">scalable</span>, and <span className="emphasis">future-proof</span>.
                            Whether you’re a <span className="highlight">developer</span>, a <span className="highlight">professional</span>,
                            or a <span className="highlight">casual user</span>, it enhances your PC experience by combining
                            <span className="emphasis">automation</span> with <span className="emphasis">intelligence</span>.
                        </p>

                    </div>
                </div>
            </div>

        </div>
       
    )
}

export default About_FRame
