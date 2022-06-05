import { ObjectId } from "mongodb";
import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext } from "react";
import FieldOfInterest from "../../components/FieldOfInterest";
import GetSpecialty from "../../components/forms/GetSpecialty";
import connectToDatabase from "../../lib/databaseClient";
import AuthContext from "../../store/AuthContext";

type Props = {
  _id?: string;
  name?: string;
  emailId?: string;
  regno?: string;
  role?: "student";
  Interest_1?: string;
  Interest_2?: string;
  Interest_3?: string;
};

const StudentPage: NextPage = (props: Props) => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  if (authCtx.status === "unauthenticated") {
    router.replace("/");
  }

  return (
    <div>
      <Head>
        <title>CSE Recommendation App | Student Section | SMIT</title>
        <meta
          name="description"
          content="Student region for getting recommendation approval"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1>Welcome to student section</h1>
        {!props.Interest_1 && !props.Interest_2 && !props.Interest_3 && (
          <GetSpecialty />
        )}
        {(props.Interest_1 || props.Interest_2 || props.Interest_3) && (
          <FieldOfInterest
            Interest_1={props.Interest_1!}
            Interest_2={props.Interest_2!}
            Interest_3={props.Interest_3!}
          ></FieldOfInterest>
        )}
      </main>
    </div>
  );
};

export default StudentPage;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { req } = context;

  const session = await getSession({ req });
  const client = await connectToDatabase();
  const db = client.db();
  const collection = db.collection("user");
  if (session && session.userId && typeof session.userId === "string") {
    const userData = await collection.findOne({
      _id: new ObjectId(session.userId),
    });
    return {
      props: {
        ...userData,
        _id: userData?._id.toString(),
      },
    };
  }

  return {
    props: {}, // will be passed to the page component as props
  };
};
