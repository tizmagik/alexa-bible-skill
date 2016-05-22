import test from 'ava';
import { handler as Skill } from '..';
import { Request } from 'alexa-annotations';

test('LaunchRequest', t => {
  const event = Request.launchRequest().build();

  return Skill(event).then(response => {
    t.deepEqual(response, {
      version: '1.0',
      response: {
        shouldEndSession: true,
        outputSpeech: { type: 'PlainText', text: 'Bible launched!' }
      }
    });
  });
});

test('bible', t => {
  const event = Request.intent('bible', { bookname: 'matthew', chapter: '1', verse: '2' }).build();

  return Skill(event).then(response => {
      t.deepEqual(response, {
          version: '1.0',
          response: {
              shouldEndSession: true,
              outputSpeech: {
                  type: 'SSML',
                  ssml: '<speak>Matthew 1 2 says Abraham was the father of Isaac, Isaac the father of Jacob, Jacob the father of Judah and his brothers,</speak>'
              },
              card: {
                  title: 'Verse for 2',
                  content: 'Matthew 1 2 says Abraham was the father of Isaac, Isaac the father of Jacob, Jacob the father of Judah and his brothers,',
                  type: 'Simple'
              }
          }
      });
  });
});
