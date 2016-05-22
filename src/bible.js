import { Skill, Launch, Intent } from 'alexa-annotations';
import { say, ask } from 'alexa-response';
import { ssml } from 'alexa-ssml';
import fetch from 'axios';

@Skill
export default class Bible {

    @Launch
    launch() {
        return say('Bible launched!');
    }

    @Intent('bible')
    bible({ bookname = 'Genesis', chapter = '1', verse = '1' }) {
        const url = 'http://labs.bible.org/api/?type=json&passage=';
        return fetch(url + encodeURIComponent(`${bookname} ${chapter}:${verse}`)).then(({data}) => {
            const {bookname, chapter, verse, text} = data[0];
            const msg = `${bookname} ${chapter} ${verse} says ${text}`;
            return say(<speak>{msg}</speak>).card({ title: `Verse for ${verse}`, content: msg });
        }).catch(() => {
            return verse
            ? ask('I\'m sorry, I couldn\'t find that verse. What else can I look up?').reprompt('What else can I look up?')
            : ask('I\'m sorry, I currently do not know that verse.').reprompt('What other verse can I look up?');
        });
    }

    @Intent('AMAZON.HelpIntent')
    help() {
        return ask('I read bible verses. For example, say, read Romans chapter eight verse eight.').reprompt('What verse should I read?');
    }

    @Intent('AMAZON.CancelIntent', 'AMAZON.StopIntent')
    stop() {
        return say(<speak>Goodbye!</speak>);
    }

}
