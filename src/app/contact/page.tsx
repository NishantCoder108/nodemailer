"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

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
        throw response;
      }
      const responseData = await response.json();
      console.log(responseData["message"]);

      const message = responseData["message"];

      toast.success(`${message}`);
      setIsFormSubmit(false);
    } catch (err: any) {
      setIsFormSubmit(false);

      console.log(err.status);
      const message = err.statusText ? err.statusText : "Please try again";
      toast.error(message);
    }
  }

  const textAreaPlaceholder = `Hello,
I'm [Your Name], founder of [Your Company]. Our mission is to [Your Company's Mission]. Your skills are exactly what we're looking for to drive this mission forward. Let's discuss how we can collaborate to create something extraordinary.

Excited to hear from you!

Best regards,

[Founder's Name]

Founder, [Your Company]
`;

  const isDevelopment = process.env.NODE_ENV === "development";
  if (!isDevelopment) {
    console.log = () => {};
    console.error = () => {};
  }
  return (
    <>
      <main className="flex items-center justify-center flex-col min-h-screen p-4 sm:p-6 lg:p-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md sm:max-w-lg lg:max-w-2xl xl:max-w-3xl"
        >
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-semibold text-xs sm:text-sm">
                May I know your good name?
              </span>
            </div>
            <input
              type="text"
              placeholder="Steve Jobs"
              name="name"
              required
              className="input input-bordered w-full text-xs sm:text-sm"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-semibold text-xs sm:text-sm">
                Can I get your email?
              </span>
            </div>
            <input
              type="email"
              required
              placeholder="steve@apple.com"
              name="email"
              className="input input-bordered w-full text-xs sm:text-sm"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-semibold text-xs sm:text-sm">
                Can you briefly describe your message&apos;s subject?
              </span>
            </div>
            <input
              type="text"
              required
              placeholder="Opportunity to Collaborate on [Your Company's Mission]"
              name="subject"
              className="input input-bordered w-full text-xs sm:text-sm"
            />
          </label>

          <label className="form-control">
            <div className="label">
              <span className="label-text font-semibold text-xs sm:text-sm">
                What&apos;s your message for me?
              </span>
            </div>
            <textarea
              name="message"
              required
              className="textarea textarea-bordered h-64 sm:h-80 lg:h-96 w-full text-xs sm:text-sm"
              placeholder={textAreaPlaceholder}
            ></textarea>
          </label>

          {!isFormSubmit ? (
            <button
              type="submit"
              className="btn mt-4 w-full btn-primary text-xs sm:text-sm"
            >
              Send
            </button>
          ) : (
            <button disabled className="btn mt-4 w-full">
              <span className="loading loading-spinner"></span>
            </button>
          )}
        </form>
      </main>{" "}
    </>
  );
}
