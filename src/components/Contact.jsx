import { useState } from 'react';
import { db } from '../firebase'; // Your initialized Firestore public instance
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import forge from 'node-forge';
import Button from './Button';
import AnimatedTitle from './AnimatedTitle';

// Place your public key string here. (Keep your matching private key safe on your local machine)
const PUBLIC_KEY_PEM = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvef5ybvX53Xnkuvg/IHm
JyfHUJboJQ+q8fQQKwnUlH9yMoGZ7D/7SBDlA2eyH7wD/nQi5YBt7+XvU0qylH57
V/hiQ1GrzP5sZ7s2HawJLN5YWjs3gwqAGYIUTYskzbNOhQj6zgZFFRbsSb0lf7DB
hxWrifK+wH2WHK6a37rqefK/OHvTvwkRB1RBtjUjgoX5GIU6pvFEBosqzcMIdFeR
A96VRJwfdJX6k79HtmyartkqmncCaP8KQchm4t/prWc+XxKjpNGxsiapv/OTB3dw
nEbJDDHtGiqLzlVjQkQz5lRr1R1gwqT4tkocTtH5TFtgzQpllrjeG+FFabChxnXT
cwIDAQAB
-----END PUBLIC KEY-----`;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'error'
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Helper deterministic hashing (same as your previous Next.js logic)
  const hashEmail = (emailStr) => {
    const md = forge.md.sha256.create();
    md.update(emailStr.trim().toLowerCase());
    return md.digest().toHex();
  };

  // Asymmetric encryption helper
  const encryptData = (plaintext) => {
    const publicKey = forge.pki.publicKeyFromPem(PUBLIC_KEY_PEM);
    // Encrypt using RSA-OAEP padding for strong data security
    const encrypted = publicKey.encrypt(plaintext, 'RSA-OAEP', {
      md: forge.md.sha256.create(),
      mgf1: {
        md: forge.md.sha256.create()
      }
    });
    return forge.util.encode64(encrypted);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setStatus('loading');

    // Frontend Validations
    if (!name.trim() || name.length > 150) {
      setStatus('error');
      return setError('Please provide your name.');
    }
    if (email.length > 256 || !EMAIL_REGEX.test(email)) {
      setStatus('error');
      return setError('Please provide a valid email address.');
    }
    if (!subject.trim() || subject.length > 200) {
      setStatus('error');
      return setError('Please provide a subject.');
    }
    if (!message.trim() || message.length > 5000) {
      setStatus('error');
      return setError('Please provide a message.');
    }

    try {
      const emailHash = hashEmail(email);
      
      // Structure fields into a single text payload to securely lock
      const plaintextPayload = JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
      });

      const ciphertext = encryptData(plaintextPayload);

      // Write directly to your contact_form collection via Web SDK
      await addDoc(collection(db, 'contact_form'), {
        emailHash,
        ciphertext,
        createdAt: serverTimestamp(),
      });

      setStatus('idle');
      setSubmitted(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      console.error(err);
      setStatus('error');
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div id="contact" className="scroll-mt-20 overflow-hidden bg-black px-6 py-24 text-[#dfdff2] md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-center font-general text-sm uppercase tracking-[0.16em] text-[#dfdff2]/80">
          Let’s make something players love
        </p>
        <AnimatedTitle
          title="lets <b>t</b>alk"
          containerClass="pointer-events-none relative z-10 mb-16"
          className="text-5xl sm:text-7xl md:text-8xl"
        />

        <div className="grid gap-12 border-t border-white/15 pt-10 md:grid-cols-[0.8fr_1.2fr] md:gap-20 md:pt-14">
          <div>
            <p className="max-w-md font-circular-web text-lg leading-relaxed text-[#dfdff2]/75 md:text-xl">
          A new game, a tricky system, or a pipeline ready to move faster? Tell us where you want to go and we’ll help map the way.
            </p>
            <p className="mt-8 font-general text-sm uppercase tracking-[0.14em] text-[#dfdff2]/65">
              We usually reply within one business day.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-7">
            <div className="grid gap-7 sm:grid-cols-2">
              <div className="grid gap-2">
                <label htmlFor="contact-name" className="font-general text-sm uppercase tracking-widest text-[#dfdff2]/75">Name</label>
                <input id="contact-name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full border-b border-white/25 bg-transparent px-0 py-3 font-circular-web text-base text-white outline-none transition-colors placeholder:text-white/30 focus:border-[#dfdff2]" placeholder="Your name" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="contact-email" className="font-general text-sm uppercase tracking-widest text-[#dfdff2]/75">Email</label>
                <input id="contact-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full border-b border-white/25 bg-transparent px-0 py-3 font-circular-web text-base text-white outline-none transition-colors placeholder:text-white/30 focus:border-[#dfdff2]" placeholder="you@example.com" />
              </div>
            </div>
            <div className="grid gap-2">
              <label htmlFor="contact-subject" className="font-general text-sm uppercase tracking-widest text-[#dfdff2]/75">Subject</label>
              <input id="contact-subject" type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required className="w-full border-b border-white/25 bg-transparent px-0 py-3 font-circular-web text-base text-white outline-none transition-colors placeholder:text-white/30 focus:border-[#dfdff2]" placeholder="What can we help with?" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="contact-message" className="font-general text-sm uppercase tracking-widest text-[#dfdff2]/75">Message</label>
              <textarea id="contact-message" value={message} onChange={(e) => setMessage(e.target.value)} required rows={4} className="w-full resize-y border-b border-white/25 bg-transparent px-0 py-3 font-circular-web text-base text-white outline-none transition-colors placeholder:text-white/30 focus:border-[#dfdff2]" placeholder="Share a few details about your project..." />
            </div>

            {status === 'loading' && <p role="status" className="font-circular-web text-sm text-[#dfdff2]/70">Encrypting data &amp; sending securely...</p>}
            {error && <p role="alert" className="font-circular-web text-sm text-red-300">{error}</p>}
            {submitted && <p role="status" className="font-circular-web text-sm text-emerald-300">Form encrypted and sent safely!</p>}

            <Button type="submit" title={status === 'loading' ? 'sending...' : 'send message'} disabled={status === 'loading'} containerClass="mt-2 disabled:cursor-wait disabled:opacity-60" />
          </form>
        </div>
      </div>
    </div>
  );
}
