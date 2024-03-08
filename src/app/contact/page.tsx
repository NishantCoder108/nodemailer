"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function Contact() {
    const [isFormSubmit, setIsFormSubmit] = useState(false);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);

        setIsFormSubmit(true);
        console.log({ formData });

        try {
            const response = await fetch("/api/contact", {
                method: "post",
                body: formData,
            });

            console.log("Response Post: ", response);

            if (!response.ok) {
                console.log("falling over");
                throw new Error(`response status: ${response.status}`);
            }
            const responseData = await response.json();
            console.log(responseData["message"]);
            setIsFormSubmit(false);
        } catch (err) {
            console.error(err);
            setIsFormSubmit(false);
            alert("Error, please try resubmitting the form");
        }
    }

    const textAreaPlaceholder = `Hello,
I'm [Your Name], founder of [Your Company]. Our mission is to [Your Company's Mission]. Your skills are exactly what we're looking for to drive this mission forward. Let's discuss how we can collaborate to create something extraordinary.

Excited to hear from you!

Best regards,

[Founder's Name]

Founder, [Your Company]
`;
    return (
        <>
            <div className="navbar bg-base-100">
                <Link className="btn btn-ghost text-xl" href="/">
                    Home
                </Link>
                <Link className="btn btn-ghost text-xl" href="/contact">
                    Contact
                </Link>
            </div>
            <main className=" flex items-center justify-center flex-col">
                <form onSubmit={handleSubmit} className="w-[30vw]">
                    {/*  */}

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text font-semibold">
                                May I know your good name?
                            </span>
                        </div>
                        <input
                            type="text"
                            placeholder="Steve Jobs"
                            name="name"
                            required
                            className="input input-bordered w-full max-w-md text-sm"
                        />
                    </label>
                    <label className="form-control w-full max-w-md">
                        <div className="label">
                            <span className="label-text font-semibold">
                                Can I get your email?
                            </span>
                        </div>
                        <input
                            type="email"
                            required
                            placeholder="steve@apple.com"
                            name="email"
                            className="input input-bordered w-full max-w-md"
                        />
                    </label>
                    <label className="form-control w-full max-w-md">
                        <div className="label">
                            <span className="label-text font-semibold">
                                Can you briefly describe your message&apos;s
                                subject?
                            </span>
                        </div>
                        <input
                            type="text"
                            required
                            placeholder="Opportunity to Collaborate on [Your Company's Mission]"
                            name="subject"
                            className="input input-bordered w-full max-w-md text-sm"
                        />
                    </label>

                    <label className="form-control">
                        <div className="label">
                            <span className="label-text font-semibold">
                                What&apos;s your message for me?
                            </span>
                        </div>
                        <textarea
                            name="message"
                            required
                            className="textarea textarea-bordered h-96  w-full max-w-md"
                            placeholder={textAreaPlaceholder}
                        ></textarea>
                    </label>

                    {!isFormSubmit ? (
                        <button
                            type="submit"
                            className="btn mt-4 w-full btn-primary max-w-md"
                        >
                            Send
                        </button>
                    ) : (
                        <button disabled className="btn mt-4 w-full max-w-md">
                            <span className="loading loading-spinner"></span>
                        </button>
                    )}
                </form>
            </main>{" "}
        </>
    );
}
