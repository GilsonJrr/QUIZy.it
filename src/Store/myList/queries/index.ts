import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ref, get, set, remove } from "firebase/database";
import { database } from "lib/firebase";

interface SetDataParams {
  adminUid?: string;
  studentUid?: string;
  value?: any;
}

const getData = async (adminUid: string, studentUid: string) => {
  //   const dataRef = ref(database, `myLists/${adminUid}/${studentUid}`);
  const dataRef = ref(
    database,
    `user/${adminUid}/students/${studentUid}/myLists`
  );
  const snapshot = await get(dataRef);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    throw new Error("No data available");
  }
};

const setData = async ({
  adminUid,
  studentUid,
  value,
}: SetDataParams): Promise<void> => {
  const dataRef = ref(database, `myLists/${adminUid}/${studentUid}`);
  await set(dataRef, value);
};

export const GetMyLists = (adminUid?: string, studentUid?: string) => {
  return useQuery({
    queryKey: ["data", adminUid, studentUid],
    queryFn: () => getData(adminUid || "", studentUid || ""),
  });
};

// export const useSetData = () => {
//   const queryClient = useQueryClient();
//   return useMutation<void, Error, SetDataParams>(setData, {
//     onSuccess: (
//       _: any,
//       variables: { adminUid: string; studentUid: string }
//     ) => {
//       queryClient.invalidateQueries({
//         queryKey: ["data", variables.adminUid, variables.studentUid],
//       });
//     },
//   });
// };
