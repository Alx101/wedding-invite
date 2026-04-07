import ics from "ics";
import React from "react";
import {
  useForm,
  type UseFormRegister,
  type UseFormSetValue,
  type UseFormWatch,
} from "react-hook-form";
import "./App.scss";

const ALLERGIES = [
  "Vegetarian",
  "Vegan",
  "Gluten free",
  "Lactose free",
  "Low fat",
  "Other (please specify)",
];

type InviteeData = {
  name: string;
  ceremony: boolean;
  dinner: boolean;
  evening: boolean;
  will_not_attend: boolean;
  allergies: Record<string, boolean>;
  other_info: string;
};

type FormValues = {
  invitees: InviteeData[];
};

function InvitationStage() {
  return (
    <>
      <div className="first_title">
        <div className="first_title__superline">
          <span className="mono first_title__superline__alex">ALEXANDER</span>
          <span className="cursive">The</span>
          <span className="mono first_title__superline__samhita">SAMHITA</span>
        </div>
        <div className="first_title__line">WEDDING</div>
        <div className="first_title__subline">
          <span className="mono">Norbergsvägen 17, 733 60 Västerfärnebo</span>
          <span className="cursive">13th June</span>
          <span className="mono">14:30</span>{" "}
        </div>
      </div>
    </>
  );
}

const timelineItems = [
  {
    time: "14:30",
    description_text: "Welcome drinks\nOutdoors",
    description: (
      <>
        Welcome drinks
        <br />
        Outdoors
      </>
    ),
  },
  {
    time: "15:00",
    description_text: "Ceremony\nIn the barn",
    description: (
      <>
        Ceremony
        <br />
        In the barn
      </>
    ),
  },
  {
    time: "15:30",
    description_text: "Fika & speeches\nOutdoors",
    description: (
      <>
        Fika & speeches
        <br />
        Outdoors
      </>
    ),
  },
  {
    time: "16:15",
    description_text: "Games & mingle\nOutdoors",
    description: (
      <>
        Games & mingle
        <br />
        Outdoors
      </>
    ),
  },
  {
    time: "17:30",
    description_text: "Buffet & BBQ dinner\nIndoors & outdoors",
    description: (
      <>
        Buffet & BBQ dinner
        <br />
        Indoors & outdoors
      </>
    ),
  },
  {
    time: "18:30",
    description_text: "Music & dancing\nOutdoors",
    description: (
      <>
        Music & dancing
        <br />
        Outdoors
      </>
    ),
  },
];

function DetailsStage() {
  return (
    <>
      <div className="timeline">
        <div className="timeline__title">TIMELINE</div>
        <ul className="timeline__items">
          {timelineItems.map((item) => (
            <li key={item.time} className="timeline__item">
              <span className="timeline__time">{item.time}</span>
              <span className="timeline__dot">•</span>
              <span className="timeline__description">{item.description}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="details">
        <h2>DRESS CODE</h2>
        <p>
          Cocktail.
          <br />
          Venue is mixed indoor and outdoors, dress accordingly.
        </p>
      </div>
      <div className="details">
        <h2>VIBE</h2>
        <p>Relaxed, simplistic and homely.</p>
      </div>
      <div className="rsvp-button">
        <button
          onClick={() =>
            window.scrollTo({
              top: document.getElementById("rsvp_0")?.offsetTop ?? 0,
              behavior: "smooth",
            })
          }
        >
          RSVP
        </button>
      </div>
    </>
  );
}

function ConfirmationStage({
  name,
  index,
  register,
  watch,
  setValue,
  onConfirm,
}: {
  name: string;
  index: number;
  register: UseFormRegister<FormValues>;
  watch: UseFormWatch<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  onConfirm: (e: React.FormEvent) => void;
}) {
  const p = `invitees.${index}` as const;

  const willNotAttend = watch(`invitees.${index}.will_not_attend`);
  const ceremony = watch(`invitees.${index}.ceremony`);
  const dinner = watch(`invitees.${index}.dinner`);
  const evening = watch(`invitees.${index}.evening`);

  const isValid = ceremony || dinner || evening || willNotAttend;

  const toggleAttendance = () => {
    const next = !willNotAttend;
    setValue(`invitees.${index}.will_not_attend`, next);
    if (next) {
      setValue(`invitees.${index}.ceremony`, false);
      setValue(`invitees.${index}.dinner`, false);
      setValue(`invitees.${index}.evening`, false);
    }
  };

  const checkBoxClasses = (striked: boolean) => {
    return ["checkbox_label", striked ? "crossed" : ""].join(" ");
  };

  return (
    <div className="form_container">
      <form onSubmit={onConfirm}>
        <div className="name">{name}</div>
        <h2>WILL YOU ATTEND?</h2>
        <span className="notice mono">Select all that apply</span>
        <div>
          <label
            htmlFor={`${p}.ceremony`}
            className={checkBoxClasses(willNotAttend)}
          >
            <span>Ceremony & Fika</span>
            <input
              type="checkbox"
              id={`${p}.ceremony`}
              disabled={willNotAttend}
              {...register(`invitees.${index}.ceremony`)}
            />
          </label>
          <label
            htmlFor={`${p}.dinner`}
            className={checkBoxClasses(willNotAttend)}
          >
            <span>Dinner</span>
            <input
              type="checkbox"
              id={`${p}.dinner`}
              disabled={willNotAttend}
              {...register(`invitees.${index}.dinner`)}
            />
          </label>
          <label
            htmlFor={`${p}.evening`}
            className={checkBoxClasses(willNotAttend)}
          >
            <span>Evening party</span>
            <input
              type="checkbox"
              id={`${p}.evening`}
              disabled={willNotAttend}
              {...register(`invitees.${index}.evening`)}
            />
          </label>
          <label htmlFor={`${p}.will_not_attend`} className="checkbox_label">
            <span>Will not attend</span>
            <input
              type="checkbox"
              id={`${p}.will_not_attend`}
              checked={willNotAttend}
              onChange={toggleAttendance}
            />
          </label>
        </div>
        <h2>FOOD PREFERENCES</h2>
        {ALLERGIES.map((allergy) => {
          const key = allergy.toLowerCase().replace(/ /g, "_");
          const currentAllergies = watch(`invitees.${index}.allergies`) ?? {};
          return (
            <label
              key={key}
              htmlFor={`${p}.allergies.${key}`}
              className="checkbox_label"
            >
              <span>{allergy}</span>
              <input
                type="checkbox"
                id={`${p}.allergies.${key}`}
                checked={!!currentAllergies[key]}
                onChange={(e) =>
                  setValue(`invitees.${index}.allergies`, {
                    ...currentAllergies,
                    [key]: e.target.checked,
                  })
                }
              />
            </label>
          );
        })}
        <label htmlFor={`${p}.other_info`}>
          <h2>OTHER INFORMATION</h2>
        </label>
        <textarea
          id={`${p}.other_info`}
          placeholder="Other information (allergies, departure time, etc.)"
          {...register(`invitees.${index}.other_info`)}
        />
        <br />
        <button type="submit" disabled={!isValid}>
          Confirm
        </button>
        <br />
        {!isValid && (
          <>
            <span className="notice">Please select your attendance</span>
            <br />
          </>
        )}
      </form>
    </div>
  );
}

function FinishedStage({
  names,
  submit,
  loading,
  sent,
}: {
  names: string[];
  submit: () => void;
  loading: boolean;
  sent: boolean;
}) {
  const [calendarEvent, setCalendarEvent] = React.useState<string>("");

  React.useEffect(() => {
    const timeline = timelineItems
      .map((item) => `${item.time} - ${item.description_text}`)
      .join("\n");
    const event = {
      start: [2026, 6, 13, 14, 30] as [number, number, number, number, number],
      end: [2026, 6, 13, 22, 0] as [number, number, number, number, number],
      title: "Alexander and Samhita's Wedding",
      description: `Welcome to our wedding at Norbergsvägen 17, 733 60 Västerfärnebo. Timeline:\n\n${timeline}\n \nDress code: Cocktail. Venue is mixed indoor and outdoors, dress accordingly.\n\nVibes: Relaxed, simplistic and homely.\n\n${window.location.href}`,
      location: "Norbergsvägen 17, 733 60 Västerfärnebo",
    };

    ics.createEvent(
      {
        start: event.start,
        end: event.end,
        title: event.title,
        description: event.description,
        location: event.location,
      },
      (_error, value) => {
        const blob = new Blob([value], { type: "text/calendar" });
        const url = URL.createObjectURL(blob);
        setCalendarEvent(url);
      },
    );
  }, []);
  return (
    <div className="finalize_attendance">
      <h2 className="summary">CONFIRMING ATTENDANCE FOR</h2>
      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <div className="confirm-button">
        {!sent && (
          <button onClick={submit} disabled={loading}>
            {loading ? "Sending..." : "Confirm"}
          </button>
        )}
        {sent && <span className="notice">RSVP sent!</span>}
      </div>

      <a
        className="map mono"
        href="https://maps.app.goo.gl/UF5c5j9eeUtcdLUZ6"
        target="_blank"
      >
        Map:{" "}
        <span className="underline">
          Norbergsvägen 17, 733 60 Västerfärnebo
        </span>
      </a>
      <a className="dates mono" href={calendarEvent} target="_blank">
        Add to calendar: <span className="underline">13th June | 14:30</span>
      </a>
    </div>
  );
}

function App() {
  const searchParams = new URLSearchParams(window.location.search);
  const names = searchParams.get("name")?.split(",") ?? [];
  const [sent, setSent] = React.useState(false);
  const [rsvpStep, setRsvpStep] = React.useState(0);
  const [sending, setSending] = React.useState(false);

  const { register, watch, setValue, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      invitees: names.map((name) => ({
        name,
        ceremony: false,
        dinner: false,
        evening: false,
        will_not_attend: false,
        allergies: {},
        other_info: "",
      })),
    },
  });

  const onSubmit = (data: FormValues) => {
    const attendance = data.invitees
      .map(
        (inv) =>
          `\n${inv.name} will${inv.will_not_attend ? " not" : ""} attend`,
      )
      .join(", ");

    if (
      confirm("You are confirming the following guests: " + attendance + "?")
    ) {
      const payload = data.invitees.map((inv) => ({
        name: inv.name,
        will_not_attend: inv.will_not_attend,
        ceremony: inv.ceremony,
        dinner: inv.dinner,
        evening: inv.evening,
        allergies: Object.entries(inv.allergies ?? {})
          .filter(([, v]) => v)
          .map(([k]) => k)
          .join(", "),
        other_info: inv.other_info,
      }));

      setSending(true);
      fetch(
        "https://script.google.com/macros/s/AKfycbxDBrI5_9n-p-lM10v-R_3C44TN0c4TB3pMnTV5oAS02ZpSLx5BJl8_KsYUhJ3knlnp/exec",
        {
          method: "POST",
          body: JSON.stringify(payload),
        },
      )
        .then((response) => {
          setSending(false);
          if (response.ok) {
            setSent(true);
          } else {
            setSent(false);
            alert(
              "Failed to send, please try again later or contact us directly.",
            );
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const onConfirm = (index: number) => (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpStep(index + 1);
    setTimeout(() => {
      const offsetTop =
        index < names.length - 1
          ? (document.getElementById(`rsvp_${index + 1}`)?.offsetTop ?? 0)
          : (document.getElementById("finalize")?.offsetTop ?? 0);

      console.log(index, names.length);
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }, 200);
  };

  const cardStages = [
    {
      id: "invitation",
      title: "You are cordially invited to",
      content: <InvitationStage />,
      additionalCardClasses: "flipbook_background justify-content-end",
      visible: true,
    },
    {
      id: "details",
      title: "Wedding Details",
      content: <DetailsStage />,
      visible: true,
    },
    {
      id: "rsvp",
      repeat: names.length,
      title: "Please confirm your attendance",
      content: <></>,
      visible: rsvpStep > 0,
    },
  ];

  const stages = [];
  for (const stage of cardStages) {
    if (stage.repeat) {
      for (let i = 0; i < stage.repeat; i++) {
        stages.push({
          ...stage,
          visible: rsvpStep >= i,
          id: `${stage.id}_${i}`,
          content: (
            <ConfirmationStage
              name={names[i]}
              index={i}
              register={register}
              watch={watch}
              setValue={setValue}
              onConfirm={onConfirm(i)}
            />
          ),
        });
      }
    } else {
      stages.push(stage);
    }
  }
  return (
    <>
      {stages.map((stage) => (
        <div
          className={[
            "card",
            stage.additionalCardClasses,
            stage.visible ? "visible" : "hidden",
          ].join(" ")}
          id={stage.id}
        >
          <div className="card__inner">
            <div className="card__header">{stage.title}</div>
            <div className="card__content">{stage.content}</div>
          </div>
          <div className="card__overlay"></div>
        </div>
      ))}
      {names.length > 0 && (
        <div
          className={[
            "card",
            rsvpStep === names.length ? "visible" : "hidden",
          ].join(" ")}
          id="finalize"
        >
          <div className="card__inner">
            <div className="card__header">Final confirmation</div>
            <div className="card__content">
              <FinishedStage
                loading={sending}
                names={names}
                submit={() => handleSubmit(onSubmit)()}
                sent={sent}
              />
            </div>
          </div>
          <div className="card__overlay"></div>
        </div>
      )}
    </>
  );
}

// const oldCOntent =  () => {
// <><div className="card__front">
// <h2>You are invited to the wedding of</h2>
// <img className="picture" src={picture} alt="Samhita and Alexander" />
// <h1 className="titles">Samhita <br/>+<br/> Alexander</h1>
// <div className="dates">13th June | 2.30 PM</div>
// <div className="location">Norbergsvägen 17, 733 60 Västerfärnebo</div>
// <button onClick={() => setFlip(!flip)}>RSVP</button>
// </div>
// <div className="card__back">
// <span className="card__back-button" onClick={() => setFlip(false)}>&lt;- Details</span>
// <div>
//   <h2>Please confirm your attendance</h2>
//   <div>
//     <span>{name}</span>
//   </div>

// </div>
// </div></>
// };

export default App;
