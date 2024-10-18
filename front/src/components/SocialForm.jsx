import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const SocialForm = () => {
  const [socialProfiles, setSocialProfiles] = useState(() => {
    return {
      facebookUrl: "https://facebook.com",
      xUrl: "https://x.com",
      instagramUrl: "https://instagram.com",
      linkedInUrl: "https://linkedin.com",
      youtubeUrl: "https://youtube.com",
    };
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setSocialProfiles((prevDetails) => {
      return {
        ...prevDetails,
        [name]: value,
      };
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios
        .patch(
          `http://localhost:8000/api/v1/update-social-profiles`,
          socialProfiles,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res);
          toast("Social profile updated successfully");
        })
        .catch((err) => {
          console.log(err);
          toast("Social profile updatedation failed");
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="w-full p-3 mt-1 rounded-md" onSubmit={onSubmitHandler}>
      <div className="mt-4">
        <label htmlFor="facebook" className="text-gray-400">
          Facebook URL - https://facebook.com/your username
        </label>
        <input
          name="facebookUrl"
          type="text"
          autoComplete="on"
          value={socialProfiles.facebookUrl}
          onChange={onChangeHandler}
          placeholder="https://facebook.com/#"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
        />
      </div>
      <div className="mt-4">
        <label htmlFor="xUrl" className="text-gray-400">
          X URL - https://x.com/your username
        </label>
        <input
          name="xUrl"
          type="text"
          autoComplete="on"
          value={socialProfiles.xUrl}
          onChange={onChangeHandler}
          placeholder="https://x.com/#"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
        />
      </div>
      <div className="mt-4">
        <label htmlFor="instagramUrl" className="text-gray-400">
          Instagram URL - https://instagram.com/your username
        </label>
        <input
          name="instagramUrl"
          type="text"
          autoComplete="on"
          value={socialProfiles.instagramUrl}
          onChange={onChangeHandler}
          placeholder="https://instagram.com/#"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
        />
      </div>
      <div className="mt-4">
        <label htmlFor="linkedInUrl" className="text-gray-400">
          LinkedIn URL - https://linkedin.com/your username
        </label>
        <input
          name="linkedInUrl"
          type="text"
          autoComplete="on"
          value={socialProfiles.linkedInUrl}
          onChange={onChangeHandler}
          placeholder="https://instagram.com/#"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
        />
      </div>
      <div className="mt-4">
        <label htmlFor="youtubeUrl" className="text-gray-400">
          Youtube URL - https://youtube.com/your username
        </label>
        <input
          name="youtubeUrl"
          type="text"
          autoComplete="on"
          value={socialProfiles.youtubeUrl}
          onChange={onChangeHandler}
          placeholder="https://youtube.com/#"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
        />
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Update Social Profiles
        </button>
      </div>
    </form>
  );
};

export default SocialForm;
