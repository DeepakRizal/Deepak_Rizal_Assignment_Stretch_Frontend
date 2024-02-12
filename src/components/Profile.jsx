import Button from "./Button";

/* eslint-disable react/prop-types */
function Profile({ name, fieldInterest, techStack }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 m-2 shadow-md p-2">
      <div className="flex flex-col sm:flex-row  gap-3">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSJO1om5yIuoyoGVJQygoHQpZ7ABQHVNBr9drTd8z9EppOkpHGBTkBbEMILO-ygF8ab9Q&usqp=CAU"
          alt="profile-pic"
          className="h-[120px] w-[120px] md:w-auto lg:w-auto m-auto lg:m-0"
        />
        <div className="flex flex-col justify-center gap-2">
          <h3 className=" font-bold">{name}</h3>
          <p>{fieldInterest}</p>
          <ul className="flex flex-wrap ">
            {techStack.map((tech, index) => (
              <li
                className=" shadow-md border border-2-gray-500 px-2"
                key={index}
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex justify-center items-center sm:justify-end mt-3  sm:mt-0">
        <Button buttonText="View Profile" />
      </div>
    </div>
  );
}

export default Profile;
