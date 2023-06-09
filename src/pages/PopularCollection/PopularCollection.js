import AdminTitle from "../../components/AdminTitle/AdminTitle";
import "./PopularCollection.css";
import Form from "../../components/field/form";
import { useForm, useFormContext, useWatch } from "react-hook-form";
import * as React from "react";
import * as Yup from "yup";
import CollectionSelectInput from "../../components/Select/collection-select-input";
import Separator from "../../components/separator";
import useYupValidationResolver from "../../hooks/use-yup-resolver";
import { getCollections } from "../../services/collection";
import { useQuery } from "@tanstack/react-query";

const CollectionView = () => {
  const { control } = useFormContext();
  const values = useWatch({
    control,
    name: ["file1", "file2", "file3", "file4"],
  });
  console.log(values);
  return (
    <div className="popular-collection-display">
      {values.map((value, index) =>
        !!value ? (
          <img src={value} className={`popular-collection-${index + 1}`} />
        ) : (
          <div className={`popular-collection-${index + 1}`}>{index + 1}</div>
        )
      )}
    </div>
  );
};

const PopularCollection = () => {
  // const [idGambar1, setIdGambar1] = React.useState("");
  // const [idGambar2, setIdGambar2] = React.useState("");
  // const [idGambar3, setIdGambar3] = React.useState("");
  // const [idGambar4, setIdGambar4] = React.useState("");
  // const [initiate, setInitiate] = React.useState(false);
  // const { data, isFetching } = useQuery(["get-collections-data"], () =>
  //   getCollections()
  // );

  // React.useEffect(() => {
  //   if (!initiate && data?.data) {
  //     const collections = data?.data;
  //     const gambar1 = collections.filter((collection) => {
  //       return collection.popular_collection === 1;
  //     });
  //     setIdGambar1(gambar1[0].id);
  //     const gambar2 = collections.filter((collection) => {
  //       return collection.popular_collection === 2;
  //     });
  //     setIdGambar2(gambar2[0].id);
  //     const gambar3 = collections.filter((collection) => {
  //       return collection.popular_collection === 3;
  //     });
  //     setIdGambar3(gambar3[0].id);
  //     const gambar4 = collections.filter((collection) => {
  //       return collection.popular_collection === 4;
  //     });
  //     setIdGambar4(gambar4[0].id);
  //     setInitiate(true);
  //   }
  // }, [data?.data, initiate, idGambar1, idGambar2, idGambar3, idGambar4]);

  const defaultValues = React.useMemo(
    () => ({
      gambar1: "",
      gambar2: "",
      gambar3: "",
      gambar4: "",
      file1: "",
      file2: "",
      file3: "",
      file4: "",
    }),
    []
  );

  const yupSchema = React.useMemo(
    () =>
      Yup.object().shape({
        gambar1: Yup.string().required("Harap pilih Gambar 1 terlebih dahulu"),
        gambar2: Yup.string().required("Harap pilih Gambar 2 terlebih dahulu"),
        gambar3: Yup.string().required("Harap pilih Gambar 3 terlebih dahulu"),
        gambar4: Yup.string().required("Harap pilih Gambar 4 terlebih dahulu"),
      }),
    []
  );

  const resolver = useYupValidationResolver(yupSchema);

  const methods = useForm({
    defaultValues,
    resolver,
    mode: "onChange",
  });

  const onSubmit = React.useCallback(async (values) => {
    try {
      console.log(values);
    } catch (e) {
      console.log(e);
    } finally {
    }
  }, []);

  return (
    <div className="popular-collection">
      <Form onSubmit={onSubmit} methods={methods}>
        <AdminTitle props={"Popular Collection"} />
        <div className="popular-collection-content">
          <div className="popular-collection-selector">
            {["gambar1", "gambar2", "gambar3", "gambar4"].map(
              (value, index) => {
                return (
                  <>
                    <CollectionSelectInput
                      label={`Gambar ${index + 1}`}
                      name={value}
                      onAfterChangeDetail={(value) =>
                        methods.setValue(`file${index + 1}`, value.extra.gambar)
                      }
                    />
                    <Separator _gap={36} />
                  </>
                );
              }
            )}
            <button className="save-popular-collection">SIMPAN</button>
            <CollectionView />
          </div>
        </div>
      </Form>
    </div>
  );
};

export default PopularCollection;
