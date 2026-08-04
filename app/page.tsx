"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

const birthday = {
  name: "Oan",
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
  | "voice"
  | "gift";

const sections: { id: Section; icon: string; title: string; note: string }[] = [
  { id: "songs", icon: "♪", title: "Songs", note: "that sound like you" },
  { id: "games", icon: "✦", title: "Games", note: "a tiny birthday break" },
  { id: "achievements", icon: "♥", title: "Your wins", note: "look how far you’ve come" },
  { id: "memories", icon: "⌁", title: "Memories", note: "our favorite frames" },
  { id: "wish", icon: "✉", title: "My wish", note: "a letter just for you" },
  { id: "voice", icon: "◖", title: "Voice note", note: "listen with earphones" },
  { id: "gift", icon: "★", title: "Your present", note: "save this one for last" },
];

const quiz = [
  {
    question: "Who is your biggest fan?",
    options: ["Your mom", "Me, obviously", "Your group chat"],
    answer: 1,
  },
  {
    question: "What should you bring to our Jakarta date?",
    options: ["A full itinerary", "Just yourself", "A spreadsheet"],
    answer: 1,
  },
  {
    question: "How loved are you today?",
    options: ["A little", "A lot", "More than this page can fit"],
    answer: 2,
  },
];

const coupons = [
  "One surprise date",
  "Movie night — your choice",
  "One unlimited hug",
  "Dessert or coffee date",
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

export default function BirthdayZine() {
  const [stage, setStage] = useState<Stage>("identity");
  const [rejected, setRejected] = useState(false);
  const [section, setSection] = useState<Section>("menu");
  const [cameraStarted, setCameraStarted] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [capturedPhoto, setCapturedPhoto] = useState("");
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [voiceUrl, setVoiceUrl] = useState("");
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
      if (voiceUrl) URL.revokeObjectURL(voiceUrl);
    };
  }, [voiceUrl]);

  const startCamera = async () => {
    setCameraError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      streamRef.current = stream;
      setCameraStarted(true);
      requestAnimationFrame(() => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      });
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
    setCapturedPhoto(canvas.toDataURL("image/jpeg", 0.92));
    streamRef.current?.getTracks().forEach((track) => track.stop());
    setCameraStarted(false);
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
      <main className="stage-shell">
        <section className="zine-page identity-page">
          <PaperDoodles />
          <p className="eyebrow">this little website belongs to</p>
          <div className="mini-polaroid" aria-hidden="true">
            <span>?</span>
            <b>birthday boy</b>
          </div>
          <h1>Are you<br /><em>{birthday.name}?</em></h1>
          {!rejected ? (
            <div className="button-row">
              <button className="paper-button primary" onClick={() => setStage("cake")}>Yes, that’s me</button>
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
    );
  }

  if (stage === "cake") {
    return (
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
    );
  }

  if (stage === "celebrate") {
    return (
      <main className="stage-shell celebration-stage">
        <Confetti />
        <section className="zine-page celebration-page">
          <div className="heart-balloon" aria-hidden="true">♥<i /></div>
          <p className="eyebrow">the candle is out!</p>
          <h1>Happy birthday,<br /><em>{birthday.name}</em></h1>
          <p className="lead-copy">
            I hope {birthday.age} brings you closer to every dream you’ve been working toward — and gives you even more reasons to be proud of yourself.
          </p>
          <button className="paper-button primary" onClick={() => setStage("camera")}>Capture this moment 📸</button>
        </section>
      </main>
    );
  }

  if (stage === "camera") {
    return (
      <main className="stage-shell camera-stage">
        <section className="zine-page camera-page">
          <p className="eyebrow">birthday photobooth</p>
          <h1>Say <em>twenty-four!</em></h1>
          <div className="photo-booth">
            {!cameraStarted && !capturedPhoto && (
              <div className="camera-placeholder">
                <span aria-hidden="true">◎</span>
                <p>Your camera preview will appear here.</p>
              </div>
            )}
            {cameraStarted && <video ref={videoRef} autoPlay playsInline muted aria-label="Live camera preview" />}
            {capturedPhoto && <img src={capturedPhoto} alt="Your captured birthday moment" />}
            <canvas ref={canvasRef} hidden />
            <div className="booth-caption">HAPPY BIRTHDAY • {birthday.age}</div>
          </div>
          {cameraError && <p className="camera-error" role="alert">{cameraError}</p>}
          <div className="button-row camera-actions">
            {!cameraStarted && !capturedPhoto && <button className="paper-button primary" onClick={startCamera}>Open camera</button>}
            {cameraStarted && <button className="paper-button primary" onClick={takePhoto}>Take photo</button>}
            {capturedPhoto && (
              <>
                <button className="paper-button" onClick={() => setCapturedPhoto("")}>Retake</button>
                <a className="paper-button primary" href={capturedPhoto} download={`${birthday.name}-birthday-photo.jpg`}>Download</a>
              </>
            )}
          </div>
          <button className="text-button" onClick={enterHome}>{capturedPhoto ? "Go to home →" : "Skip and go home →"}</button>
        </section>
      </main>
    );
  }

  return (
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
              <div className="big-record"><i>for<br />you</i></div>
              <span>now spinning</span>
            </div>
            <div className="section-copy">
              <p className="eyebrow">songs that remind me of you</p>
              <h2>Our little <em>soundtrack</em></h2>
              <div className="track-list">
                {["The song that feels like our beginning", "The one I play when I miss you", "The song for our next drive"].map((track, index) => (
                  <div className="track" key={track}>
                    <b>0{index + 1}</b><span>{track}<small>Add your chosen song + note here</small></span><i>♪</i>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {section === "games" && (
          <div className="section-layout game-layout">
            <div className="maze-card" aria-hidden="true">
              <p>how can you get to me?</p>
              <div className="maze-lines">╔═╗ ╔══╗<br />║ ╚═╝╔ ║<br />╠══╗ ║ ║<br />║ ╔╝ ╚═╣<br />╚═╝ ♥ ═╝</div>
            </div>
            <div className="quiz-card">
              <p className="eyebrow">birthday pop quiz</p>
              {!quizDone ? (
                <>
                  <span className="quiz-count">{quizIndex + 1} / {quiz.length}</span>
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
                  <h2>{quizScore}/{quiz.length} — still my favorite person.</h2>
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
                ["01", "Becoming more you", "You keep growing into someone brave, kind, and entirely your own."],
                ["02", "All the quiet wins", "The progress nobody sees still counts. I see it, and I’m proud."],
                ["03", "Showing up", "For your dreams, your people, and for us — even on difficult days."],
                ["24", "This new chapter", "A whole new year of chances, stories, and reasons to celebrate you."],
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
              {["our first favorite", "the blurry one", "a very good day", "more to come"].map((label, index) => (
                <div className={`memory-frame memory-${index + 1}`} key={label}>
                  <div><span>+</span><small>add photo</small></div><p>{label}</p>
                </div>
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
              <p>Happy birthday, love.</p>
              <p>I hope this year is gentle with you and exciting in all the right ways. I hope you find courage when things feel uncertain, rest when you need it, and so many reasons to be proud of yourself.</p>
              <p>Thank you for being exactly who you are — for the laughter, the comfort, and all the ordinary moments that become special because they’re with you.</p>
              <p>Here’s to more dreams, more adventures, and more birthdays together.</p>
              <strong>Always yours, ♡</strong>
            </article>
          </div>
        )}

        {section === "voice" && (
          <div className="voice-page">
            <div className="cassette" aria-hidden="true"><b>FOR YOU</b><i /><i /><span>▶</span></div>
            <div className="section-copy">
              <p className="eyebrow">put on your earphones</p>
              <h2>A tiny message <em>from me</em></h2>
              <p>Choose your recording to preview this page. When the final audio is added to the site, his message will be waiting right here.</p>
              <label className="paper-button file-button">
                Choose voice recording
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    if (voiceUrl) URL.revokeObjectURL(voiceUrl);
                    setVoiceUrl(URL.createObjectURL(file));
                  }}
                />
              </label>
              {voiceUrl && <audio controls src={voiceUrl}>Your browser does not support audio playback.</audio>}
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
                <div className="ticket-stub"><span>JKT</span><b>ONE VERY SPECIAL DATE</b><small>LOCATION: SECRET • DRESS CODE: CUTE</small></div>
                <p className="eyebrow">you’ve unlocked</p>
                <h2>A birthday date in <em>Jakarta</em></h2>
                <p>Planned entirely by me for when I come to Jakarta. You only need to bring yourself — and maybe dress a little nice 👀</p>
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
                  <div><small>DESTINATION</small><strong>JAKARTA</strong></div>
                  <div><small>PLAN</small><strong>SURPRISE</strong></div>
                  <div><small>PASSENGERS</small><strong>YOU + ME</strong></div>
                  <span>♥ 24 ♥</span>
                </div>
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
  );
}
