"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

const birthday = {
  name: "Oan",
  fullName: "Reynhart Henry Halomoan",
  age: 24,
  from: "the girl who loves you most",
};

type Stage = "identity" | "cake" | "celebrate" | "camera" | "home";
type Section =
  | "menu"
  | "songs"
  | "games"
  | "achievements"
  | "memories"
  | "wish"
  | "notes"
  | "voice"
  | "gift";

const sections: { id: Section; icon: string; title: string; note: string }[] = [
  { id: "songs", icon: "♪", title: "Songs", note: "that sound like you" },
  { id: "games", icon: "✦", title: "Games", note: "a tiny birthday break" },
  { id: "achievements", icon: "♥", title: "Your wins", note: "look how far you’ve come" },
  { id: "memories", icon: "⌁", title: "Memories", note: "our favorite frames" },
  { id: "wish", icon: "✉", title: "My wish", note: "a letter just for you" },
  { id: "notes", icon: "24", title: "24 notes", note: "for your 24th birthday" },
  { id: "voice", icon: "◖", title: "Voice note", note: "listen with earphones" },
  { id: "gift", icon: "★", title: "Your present", note: "save this one for last" },
];

const birthdayNotes = [
  "happy 24th birthday to my favorite person 🤍",
  "i’m so proud of the man you are and everything you’re becoming.",
  "i love how hardworking and ambitious you are.",
  "you inspire me to dream bigger and work harder.",
  "thank you for always trying to make me happy.",
  "i love your strength, but i love your soft side even more.",
  "you make me feel safe, loved, and cared for.",
  "i’m grateful for every conversation, every laugh, and every moment with you.",
  "even when we’re far apart, you still feel like home to me.",
  "i wish i could be there to celebrate you properly today.",
  "thank you for choosing me and letting me be part of your life.",
  "i love how passionate you are about the things you care about.",
  "you deserve every good thing that is coming your way.",
  "i hope 24 brings you closer to all your biggest dreams.",
  "i’ll always be your biggest supporter and loudest cheerleader.",
  "i love the way you make ordinary moments feel special.",
  "thank you for being patient with me, even when i’m difficult.",
  "i hope you always remember how loved you are.",
  "you’re one of the greatest blessings in my life.",
  "i’m so lucky that i get to love you.",
  "no matter how busy life gets, i’ll always make space for you.",
  "i can’t wait to create more memories with you.",
  "a year closer to becoming naruto six paths sage mode.",
  "happy birthday, my love. i love you more than these 24 notes could ever explain 🤍",
];

const quiz = [
  {
    series: "NARUTO",
    question: "Which Path of Pain uses the King of Hell for interrogation and restoration?",
    options: ["Human Path", "Naraka Path", "Asura Path", "Preta Path"],
    answer: 1,
  },
  {
    series: "ONE PIECE",
    question: "What is the full name of the Devil Fruit eaten by Kaku?",
    options: ["Neko Neko no Mi, Model: Giraffe", "Ushi Ushi no Mi, Model: Giraffe", "Uma Uma no Mi, Model: Giraffe", "Hito Hito no Mi, Model: Giraffe"],
    answer: 1,
  },
  {
    series: "NARUTO",
    question: "What is the true name of the Island Turtle where Naruto trained with Killer B?",
    options: ["Ningame", "Genbu", "Katsuyu", "Kamejima"],
    answer: 1,
  },
  {
    series: "ONE PIECE",
    question: "What is the name of Enel’s colossal flying ark?",
    options: ["Noah", "Maxim", "Pluton", "Ark Corona"],
    answer: 1,
  },
  {
    series: "NARUTO",
    question: "Which sword of the Seven Ninja Swordsmen uses explosive tags along its blade?",
    options: ["Kabutowari", "Hiramekarei", "Shibuki", "Nuibari"],
    answer: 2,
  },
  {
    series: "ONE PIECE",
    question: "Which kingdom was explorer Mont Blanc Noland born in?",
    options: ["Goa Kingdom", "Lvneel Kingdom", "Sorbet Kingdom", "Briss Kingdom"],
    answer: 1,
  },
  {
    series: "NARUTO",
    question: "Who was the famed wielder of the blastsword Shibuki?",
    options: ["Jinin Akebino", "Kushimaru Kuriarare", "Jinpachi Munashi", "Ameyuri Ringo"],
    answer: 2,
  },
  {
    series: "ONE PIECE",
    question: "What is the name of Tom’s only fully functioning Sea Train?",
    options: ["Rocketman", "Puffing Tom", "Aqua Laguna", "Sea Rabbit"],
    answer: 1,
  },
];

const spotifyTracks = [
  { id: "2TEQvxxQabwLQMqWMg1qGu", note: "a song that makes me think of you" },
  { id: "1lORkxEMmsCZqhoxcmk3A3", note: "for the moments when I miss you" },
  { id: "35o9a4iAfLl5jRmqMX9c1D", note: "a little piece of our soundtrack" },
  { id: "4y5bvROuBDPr5fuwXbIBZR", note: "one more, because you deserve an encore" },
];

const coupons = [
  "One surprise date",
  "Movie night — your choice",
  "One unlimited hug",
  "Dessert or coffee date",
];

const boothSlots = [
  { left: "8.8%", top: "27.7%", width: "38.1%", height: "27.4%", x: 90, y: 425, w: 390, h: 420 },
  { left: "53.2%", top: "27.7%", width: "36.9%", height: "27.4%", x: 545, y: 425, w: 378, h: 420 },
  { left: "9.3%", top: "60.2%", width: "37.3%", height: "29.6%", x: 95, y: 925, w: 382, h: 455 },
  { left: "53.2%", top: "60.2%", width: "36.6%", height: "29.6%", x: 545, y: 925, w: 375, h: 455 },
];

function Confetti() {
  return (
    <div className="confetti" aria-hidden="true">
      {Array.from({ length: 26 }, (_, index) => (
        <i
          key={index}
          style={
            {
              "--x": `${(index * 37) % 100}%`,
              "--delay": `${(index % 7) * 0.09}s`,
              "--turn": `${index * 41}deg`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

function PaperDoodles() {
  return (
    <div className="paper-doodles" aria-hidden="true">
      <span className="doodle-heart">♥</span>
      <span className="doodle-star">✦</span>
      <span className="doodle-spark">✳</span>
      <span className="doodle-dot">•</span>
    </div>
  );
}

function SoundtrackShell({ active, children }: { active: boolean; children: ReactNode }) {
  const [playerOpen, setPlayerOpen] = useState(false);

  return (
    <>
      {active && (
        <aside className="soundtrack-control" aria-label="Opening birthday soundtrack">
          <button
            className="soundtrack-toggle"
            onClick={() => setPlayerOpen((open) => !open)}
            aria-expanded={playerOpen}
            aria-controls="birthday-soundtrack-player"
          ><span>♪</span> music</button>
          <div
            id="birthday-soundtrack-player"
            className={playerOpen ? "soundtrack-popover open" : "soundtrack-popover"}
            aria-hidden={!playerOpen}
          >
            <p><span>♪</span> now playing: Every Summertime</p>
            <iframe
              src="https://open.spotify.com/embed/track/68HocO7fx9z0MgDU0ZPHro?utm_source=generator&theme=0&autoplay=1"
              width="100%"
              height="80"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="eager"
              tabIndex={playerOpen ? 0 : -1}
              title="Every Summertime by NIKI"
            />
          </div>
        </aside>
      )}
      {children}
    </>
  );
}

export default function BirthdayZine() {
  const [stage, setStage] = useState<Stage>("identity");
  const [soundtrackStarted, setSoundtrackStarted] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [section, setSection] = useState<Section>("menu");
  const [cameraStarted, setCameraStarted] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [boothPhotos, setBoothPhotos] = useState<string[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [giftOpen, setGiftOpen] = useState(false);
  const [dateAccepted, setDateAccepted] = useState(false);
  const [noRun, setNoRun] = useState(0);
  const [redeemed, setRedeemed] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const stream = streamRef.current;
    if (!cameraStarted || !video || !stream) return;
    if (video.srcObject !== stream) video.srcObject = stream;
    void video.play().catch(() => {
      setCameraError("Tap Open camera again if Safari pauses the preview.");
    });
  }, [cameraStarted, boothPhotos.length]);

  const startCamera = async () => {
    setCameraError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      streamRef.current = stream;
      setCameraStarted(true);
    } catch {
      setCameraError("Camera permission wasn’t available — you can still continue.");
    }
  };

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !video.videoWidth) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    context?.translate(canvas.width, 0);
    context?.scale(-1, 1);
    context?.drawImage(video, 0, 0, canvas.width, canvas.height);
    const photo = canvas.toDataURL("image/jpeg", 0.92);
    const nextPhotos = [...boothPhotos, photo];
    setBoothPhotos(nextPhotos);
    if (nextPhotos.length >= boothSlots.length) {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      setCameraStarted(false);
    }
  };

  const retakeLastPhoto = async () => {
    setBoothPhotos((photos) => photos.slice(0, -1));
    if (!cameraStarted) await startCamera();
  };

  const resetPhotobooth = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    setCameraStarted(false);
    setBoothPhotos([]);
  };

  const downloadPhotobooth = async () => {
    if (boothPhotos.length !== boothSlots.length) return;
    const loadImage = (src: string) => new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = src;
    });
    const drawContain = (
      context: CanvasRenderingContext2D,
      image: HTMLImageElement,
      x: number,
      y: number,
      width: number,
      height: number,
    ) => {
      const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;
      const drawX = x + (width - drawWidth) / 2;
      const drawY = y + (height - drawHeight) / 2;
      context.drawImage(image, drawX, drawY, drawWidth, drawHeight);
    };
    try {
      const output = document.createElement("canvas");
      output.width = 1024;
      output.height = 1536;
      const context = output.getContext("2d");
      if (!context) return;
      const template = await loadImage("/photobooth-template.png");
      context.drawImage(template, 0, 0, output.width, output.height);
      const photos = await Promise.all(boothPhotos.map(loadImage));
      photos.forEach((photo, index) => {
        const slot = boothSlots[index];
        drawContain(context, photo, slot.x, slot.y, slot.w, slot.h);
      });
      const link = document.createElement("a");
      link.href = output.toDataURL("image/jpeg", 0.94);
      link.download = `${birthday.name}-birthday-photobooth.jpg`;
      link.click();
    } catch {
      setCameraError("The photobooth sheet couldn’t be prepared. Please try again.");
    }
  };

  const answerQuiz = (answer: number) => {
    const nextScore = quizScore + (answer === quiz[quizIndex].answer ? 1 : 0);
    setQuizScore(nextScore);
    if (quizIndex === quiz.length - 1) setQuizDone(true);
    else setQuizIndex((current) => current + 1);
  };

  const resetQuiz = () => {
    setQuizIndex(0);
    setQuizScore(0);
    setQuizDone(false);
  };

  const enterHome = () => {
    setStage("home");
    setSection("menu");
  };

  if (stage === "identity") {
    return (
      <SoundtrackShell active={soundtrackStarted}>
        <main className="stage-shell">
        <section className="zine-page identity-page">
          <PaperDoodles />
          <p className="eyebrow">this little website belongs to</p>
          <div className="mini-polaroid">
            <img src="/little-oan-cutout.png" alt={`${birthday.name} smiling as a little boy in a party hat`} />
            <b>birthday boy</b>
          </div>
          <h1>Are you<br /><em>{birthday.name}?</em></h1>
          {!rejected ? (
            <div className="button-row">
              <button className="paper-button primary" onClick={() => { setSoundtrackStarted(true); setStage("cake"); }}>Yes, that’s me</button>
              <button className="paper-button" onClick={() => setRejected(true)}>Nope</button>
            </div>
          ) : (
            <div className="rejection-note" role="status">
              <strong>Too bad, you’re not him 😛</strong>
              <button className="text-button" onClick={() => setRejected(false)}>Okay, let me try again</button>
            </div>
          )}
        </section>
        </main>
      </SoundtrackShell>
    );
  }

  if (stage === "cake") {
    return (
      <SoundtrackShell active={soundtrackStarted}>
        <main className="stage-shell blue-stage">
        <section className="zine-page cake-page">
          <PaperDoodles />
          <p className="eyebrow">make a wish</p>
          <h1>The birthday<br /><em>boy!</em></h1>
          <div className="cake" aria-label="Birthday cake with one lit candle">
            <div className="flame" />
            <div className="candle" />
            <div className="icing"><i /><i /><i /><i /><i /></div>
            <div className="cake-body"><span>HAPPY {birthday.age}</span></div>
            <div className="cake-plate" />
          </div>
          <button className="paper-button primary" onClick={() => setStage("celebrate")}>Blow the candle</button>
          <p className="tiny-note">tap the button — wishes are private</p>
        </section>
        </main>
      </SoundtrackShell>
    );
  }

  if (stage === "celebrate") {
    return (
      <SoundtrackShell active={soundtrackStarted}>
        <main className="stage-shell celebration-stage">
        <Confetti />
        <section className="zine-page celebration-page">
          <div className="childhood-reveal">
            <img
              className="childhood-cutout"
              src="/little-oan-cutout.png"
              alt={`${birthday.name} smiling as a little boy in a birthday hat`}
            />
            <span aria-hidden="true">♥</span>
          </div>
          <p className="eyebrow">the candle is out!</p>
          <h1>Happy 24th birthday,<br /><em>my love 🤍</em></h1>
          <p className="lead-copy">
            I’m so proud of the man you are, sayang — hardworking, ambitious, strong, and always determined to build the life you want.
          </p>
          <button className="paper-button primary" onClick={() => setStage("camera")}>Capture this moment 📸</button>
        </section>
        </main>
      </SoundtrackShell>
    );
  }

  if (stage === "camera") {
    return (
      <SoundtrackShell active={soundtrackStarted}>
        <main className="stage-shell camera-stage">
        <section className="zine-page camera-page">
          <p className="eyebrow">birthday photobooth</p>
          <h1>Say <em>twenty-four!</em></h1>
          <p className="booth-progress">
            {boothPhotos.length === 4 ? "Your birthday sheet is ready!" : `${boothPhotos.length} of 4 photos taken`}
          </p>
          <div className="photo-booth">
            <img className="booth-template" src="/photobooth-template.png" alt="RHH is turning 24 birthday photobooth template" />
            {boothSlots.map((slot, index) => (
              <div
                className="booth-slot"
                key={index}
                style={{ left: slot.left, top: slot.top, width: slot.width, height: slot.height }}
              >
                {boothPhotos[index] && <img src={boothPhotos[index]} alt={`Birthday photobooth photo ${index + 1}`} />}
                {cameraStarted && index === boothPhotos.length && (
                  <video ref={videoRef} autoPlay playsInline muted aria-label={`Live camera preview for photo ${index + 1}`} />
                )}
                {!cameraStarted && index === boothPhotos.length && boothPhotos.length < 4 && (
                  <div className="empty-frame"><span>◎</span><small>photo {index + 1}</small></div>
                )}
              </div>
            ))}
            <canvas ref={canvasRef} hidden />
          </div>
          {cameraError && <p className="camera-error" role="alert">{cameraError}</p>}
          <div className="button-row camera-actions">
            {!cameraStarted && boothPhotos.length === 0 && <button className="paper-button primary" onClick={startCamera}>Open camera</button>}
            {cameraStarted && boothPhotos.length < 4 && <button className="paper-button primary" onClick={takePhoto}>Take photo {boothPhotos.length + 1}</button>}
            {boothPhotos.length > 0 && <button className="paper-button" onClick={retakeLastPhoto}>Retake last</button>}
            {boothPhotos.length === 4 && <button className="paper-button primary" onClick={downloadPhotobooth}>Download photobooth</button>}
            {boothPhotos.length > 0 && <button className="text-button compact" onClick={resetPhotobooth}>Start over</button>}
          </div>
          <button className="text-button" onClick={enterHome}>{boothPhotos.length === 4 ? "Go to home →" : "Skip and go home →"}</button>
        </section>
        </main>
      </SoundtrackShell>
    );
  }

  return (
    <SoundtrackShell active={soundtrackStarted}>
      <main className="site-shell">
      <header className="site-header">
        <button className="brand" onClick={() => setSection("menu")} aria-label="Go to birthday zine home">
          <span>♥</span> {birthday.name}’s birthday zine
        </button>
        <p>made by {birthday.from}</p>
      </header>

      <section className={`content-page section-${section}`}>
        {section === "menu" && (
          <>
            <div className="home-hero">
              <div>
                <p className="eyebrow">a little book about</p>
                <h1>The <em>birthday boy</em></h1>
                <p className="full-name">{birthday.fullName} • {birthday.name} • {birthday.age}</p>
                <p>Take your time. Every page was made with a ridiculous amount of love.</p>
              </div>
              <div className="cover-collage" aria-hidden="true">
                <div className="record"><i>24</i></div>
                <div className="party-hat">★</div>
                <div className="tape">birthday edition</div>
              </div>
            </div>
            <div className="section-grid" aria-label="Birthday zine sections">
              {sections.map((item, index) => (
                <button
                  key={item.id}
                  className={`section-card card-${index + 1}`}
                  onClick={() => setSection(item.id)}
                >
                  <span>{item.icon}</span>
                  <strong>{item.title}</strong>
                  <small>{item.note}</small>
                </button>
              ))}
            </div>
          </>
        )}

        {section === "songs" && (
          <div className="section-layout songs-layout">
            <div className="vinyl-wrap">
              <img
                className="vinyl-art"
                src="/oan-vinyl.png"
                alt={`Birthday vinyl record with ${birthday.name}’s childhood face in the center`}
              />
              <span>now spinning</span>
            </div>
            <div className="section-copy">
              <p className="eyebrow">songs that remind me of you</p>
              <h2>Our little <em>soundtrack</em></h2>
              <div className="spotify-list">
                {spotifyTracks.map((track, index) => (
                  <div className="spotify-card" key={track.id}>
                    <p><b>0{index + 1}</b> {track.note}</p>
                    <iframe
                      src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator&theme=0`}
                      width="100%"
                      height="152"
                      frameBorder="0"
                      allowFullScreen
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      title={`Spotify song ${index + 1} for ${birthday.name}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {section === "games" && (
          <div className="section-layout game-layout">
            <div className="anime-card" aria-hidden="true">
              <span className="ninja-mark">忍</span>
              <p>NARUTO</p>
              <b>×</b>
              <p>ONE PIECE</p>
              <span className="pirate-mark">☠</span>
              <small>eight questions • no easy mode</small>
            </div>
            <div className="quiz-card">
              <p className="eyebrow">shinobi × pirate trivia</p>
              {!quizDone ? (
                <>
                  <span className="quiz-count"><b>{quiz[quizIndex].series}</b> • {quizIndex + 1} / {quiz.length}</span>
                  <h2>{quiz[quizIndex].question}</h2>
                  <div className="quiz-options">
                    {quiz[quizIndex].options.map((option, index) => (
                      <button className="paper-button" key={option} onClick={() => answerQuiz(index)}>{option}</button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="quiz-result">
                  <span>♥</span>
                  <h2>{quizScore}/{quiz.length} — {quizScore === quiz.length ? "Hokage and Pirate King level." : quizScore >= 6 ? "elite shinobi-pirate status." : "time for a rewatch, sayang."}</h2>
                  <button className="paper-button" onClick={resetQuiz}>Play again</button>
                </div>
              )}
            </div>
          </div>
        )}

        {section === "achievements" && (
          <div className="achievement-page">
            <p className="eyebrow">a very official record</p>
            <h2>Look at everything <em>you’ve become</em></h2>
            <div className="playing-cards">
              {[
                ["01", "The way you care", "You once paid off all of a Gojek driver’s debt simply because you felt for him. Your kindness is never just something you say — you act on it."],
                ["02", "Your brilliant mind", "Your very first job is at BCG. That says so much about how smart, capable, and hardworking you are."],
                ["03", "Logical and soft", "You think so clearly and logically, yet underneath it all you have the softest, most caring heart."],
                ["04", "Your ambition", "You know the life you want and you keep working toward it with focus, courage, and determination."],
                ["05", "How you show up", "You make the people you love feel cared for through the thoughtful things you do, even when nobody is watching."],
                ["24", "The man you’re becoming", "Every year adds another reason to admire you. I’m endlessly proud to stand beside you and watch you grow."],
              ].map(([number, title, copy], index) => (
                <article className={`achievement-card tilt-${index}`} key={number}>
                  <b>{number}<span>♥</span></b><h3>{title}</h3><p>{copy}</p><i>♥ {number}</i>
                </article>
              ))}
            </div>
          </div>
        )}

        {section === "memories" && (
          <div className="memory-page">
            <p className="eyebrow">to many more birthdays together</p>
            <h2>A few frames from <em>us</em></h2>
            <div className="photo-strip">
              {[
                { src: "/memory-pasta.jpg", label: "us at our fav pasta place", alt: "Oan and Allyna together at their favorite pasta place", shape: "landscape" },
                { src: "/memory-photobooth.jpg", label: "cute photobooth of us", alt: "Oan and Allyna hugging in a cute photobooth picture", shape: "landscape" },
                { src: "/memory-first-favorite.jpg", label: "first favorite <3", alt: "A sweet candid memory of Oan and Allyna", shape: "portrait" },
                { src: "/memory-bali.jpg", label: "bali, the start of many more vacation to comeee", alt: "Oan and Allyna smiling together on their Bali vacation", shape: "portrait" },
              ].map((memory, index) => (
                <figure className={`memory-frame memory-${index + 1} ${memory.shape}`} key={memory.src}>
                  <div><img src={memory.src} alt={memory.alt} /></div>
                  <figcaption>{memory.label}</figcaption>
                </figure>
              ))}
            </div>
            <p className="hand-note">my favorite place has always been wherever you are. ♡</p>
          </div>
        )}

        {section === "wish" && (
          <div className="letter-page">
            <div className="envelope" aria-hidden="true"><span>for {birthday.name}</span></div>
            <article className="letter-paper">
              <p className="eyebrow">dear you...</p>
              <h2>My wish for <em>your new year</em></h2>
              <p>happy 24th birthday, my love 🤍</p>
              <p>i’m so proud of the man you are sayang hardworking, ambitious, strong, and always determined to build the life you want. underneath all of that, you also have such a soft and caring heart, and i feel so lucky that i get to know and love that side of you.</p>
              <p>i hope 24 brings you closer to every dream you’ve been working toward and gives you even more reasons to be proud of yourself. i’m sorry i can’t be there with you today, but i hope you can still feel how deeply loved and celebrated you are, even from far away.</p>
              <p>thank you for being you, for choosing me, and for making my life happier just by being in it. happy birthday, sayang. i love you so much 🤍</p>
              <strong>with all my love, always ♡</strong>
            </article>
          </div>
        )}

        {section === "notes" && (
          <div className="notes-page">
            <p className="eyebrow">twenty-four little reminders</p>
            <h2>24 notes for <em>your 24th</em></h2>
            <p className="notes-intro">A tiny collection of all the things I hope you always remember, sayang.</p>
            <div className="notes-grid">
              {birthdayNotes.map((note, index) => (
                <article className="love-note" key={note}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{note}</p>
                  <i aria-hidden="true">{index === 22 ? "✦" : "♥"}</i>
                </article>
              ))}
            </div>
            <p className="notes-finale">24 years of you — and I still have so much more love to give. ♡</p>
          </div>
        )}

        {section === "voice" && (
          <div className="voice-page">
            <div className="cassette" aria-hidden="true"><b>FOR YOU</b><i /><i /><span>▶</span></div>
            <div className="section-copy">
              <p className="eyebrow">put on your earphones</p>
              <h2>A tiny message <em>from me</em></h2>
              <p>This one is just for you, sayang. Find somewhere quiet, put on your earphones, and press play. ♡</p>
              <div className="voice-player">
                <span>FOR OAN • WITH LOVE</span>
                <audio controls preload="metadata" aria-label="Birthday voice note for Oan">
                  <source src="/voice-note.m4a" type="audio/mp4" />
                  Your browser does not support audio playback.
                </audio>
              </div>
            </div>
          </div>
        )}

        {section === "gift" && (
          <div className="gift-page">
            {!giftOpen ? (
              <div className="closed-gift">
                <p className="eyebrow">one last page...</p>
                <h2>Open your <em>present!</em></h2>
                <button className="gift-box" onClick={() => setGiftOpen(true)} aria-label="Open your digital gift">
                  <span className="gift-lid"><i /></span><span className="gift-body"><i /></span><b>tap to open</b>
                </button>
              </div>
            ) : !dateAccepted ? (
              <div className="date-invite">
                <div className="ticket-stub">
                  <span>PIERRE</span>
                  <b>ONE VERY SPECIAL BIRTHDAY DINNER • JAKARTA</b>
                  <small>SATURDAY, 19 SEPTEMBER 2026 • 19:00</small>
                </div>
                <p className="eyebrow">you’ve unlocked</p>
                <h2>Dinner at <em>Pierre Jakarta</em></h2>
                <p>Your birthday table for two is officially booked. Saturday, 19 September 2026 from 19:00–21:00, in the semi-outdoor smoking area. You only need to bring yourself — and maybe dress a little nice 👀</p>
                <h3>Will you go on this date with me?</h3>
                <div className="decision-area">
                  <button className="paper-button primary" onClick={() => setDateAccepted(true)}>Yes! It’s a date 💖</button>
                  <button
                    className="paper-button runaway"
                    style={{ transform: `translate(${[-45, 52, -25, 38][noRun % 4]}px, ${[20, -18, -6, 24][noRun % 4]}px)` }}
                    onMouseEnter={() => setNoRun((value) => value + 1)}
                    onClick={() => setNoRun((value) => value + 1)}
                  >No</button>
                </div>
              </div>
            ) : (
              <div className="accepted-date">
                <Confetti />
                <p className="eyebrow">official admission for two</p>
                <h2>It’s a <em>date!</em></h2>
                <div className="date-ticket">
                  <div><small>RESTAURANT</small><strong>PIERRE JAKARTA</strong></div>
                  <div><small>DATE</small><strong>SAT, 19 SEPT 2026</strong></div>
                  <div><small>TIME</small><strong>19:00–21:00</strong></div>
                  <div><small>RESERVATION</small><strong>PARTY OF 2 • SEMI OUTDOOR</strong></div>
                  <span>♥ 24 ♥</span>
                </div>
                <p className="reservation-note">Reserved with love by Allyna ♡</p>
                <h3>Your love coupons are now unlocked</h3>
                <div className="coupon-grid">
                  {coupons.map((coupon) => {
                    const isRedeemed = redeemed.includes(coupon);
                    return (
                      <button
                        key={coupon}
                        className={isRedeemed ? "coupon redeemed" : "coupon"}
                        onClick={() => setRedeemed((items) => isRedeemed ? items.filter((item) => item !== coupon) : [...items, coupon])}
                      >
                        <span>LOVE COUPON</span><strong>{coupon}</strong><small>{isRedeemed ? "selected ♥" : "tap to choose"}</small>
                      </button>
                    );
                  })}
                </div>
                <p className="final-note">Thank you for being born. I can’t wait to celebrate you in person. ♡</p>
              </div>
            )}
          </div>
        )}
      </section>

      <nav className="bottom-nav" aria-label="Birthday zine navigation">
        <button className={section === "menu" ? "active" : ""} onClick={() => setSection("menu")}><span>⌂</span>Home</button>
        {sections.map((item) => (
          <button key={item.id} className={section === item.id ? "active" : ""} onClick={() => setSection(item.id)}>
            <span>{item.icon}</span>{item.title}
          </button>
        ))}
      </nav>
      </main>
    </SoundtrackShell>
  );
}
