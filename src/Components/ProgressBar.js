import React from 'react'
import './ProgressBar.css'
function ProgressBar({ progress, practice }) {
    
    let opacity = 1;
    practice === 'practice' ? opacity = 0 : opacity = 1
    return (
        <div className = 'progress-bar' style ={{ opacity: `${opacity}` }}>
            <div className="progress" style ={{ opacity: `${opacity}`, width: `${progress}%` }}>
            &nbsp;&nbsp;&nbsp;&nbsp;{progress}%

            </div>
            
        </div>
    )
}

export default ProgressBar
