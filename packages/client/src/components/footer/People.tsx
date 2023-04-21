import React from 'react'
import Footer from './Footer';
import './People.css'

function People() {
    const people = [
        { name: "Melis Tasatmaz", github: "https://github.com/Angel0002" },
        { name: 'Michael "Andy" McDowall', github: "https://github.com/andym1125" },
        { name: "Aryan Patel", github: "https://github.com/Aryan-Patel5475" },
        { name: "Jason Wolfe", github: "https://github.com/Ogwolfe" },
    ];

    return (
        <div className = 'People-names'>
            <Footer people={people} />
        </div>
    )
}

export default People;