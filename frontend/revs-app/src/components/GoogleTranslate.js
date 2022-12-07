import React from 'react'
import { useEffect, useState } from 'react';

const google = window.google;

const GoogleTranslate = () => {

    const [lang, setLang] = useState("en")

    useEffect(() => {
        try {
            google.translate.TranslateElement(
                { pageLanguage: "en" }, "translate_Box"
            );
        }
        catch (e) {
            console.log("catch statement encountered attempting translate")
        }
    }, []);

    return (
        <div className="GoogleTranslate">
            <div>
                <div id="translate_Box"></div>
            </div>
        </div>
    );

}




export default GoogleTranslate