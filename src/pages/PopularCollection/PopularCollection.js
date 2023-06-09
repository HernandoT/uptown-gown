import AdminTitle from "../../components/AdminTitle/AdminTitle";
import "./PopularCollection.css";
import Form from "../../components/field/form";
import { useForm } from "react-hook-form";
import * as React from "react";
import * as Yup from "yup";
import CollectionSelectInput from "../../components/Select/collection-select-input";
import Separator from "../../components/separator";
import useYupValidationResolver from "../../hooks/use-yup-resolver";
import { getCollections } from "../../services/collection";
import { useQuery } from "@tanstack/react-query";

const PopularCollection = () => {
  const [idGambar1, setIdGambar1] = React.useState("");
  const [idGambar2, setIdGambar2] = React.useState("");
  const [idGambar3, setIdGambar3] = React.useState("");
  const [idGambar4, setIdGambar4] = React.useState("");
  const { data, isFetching } = useQuery(["get-collections"], () =>
    getCollections()
  );

  React.useEffect(() => {
    if (!isFetching) {
      const collections = data?.data;
      const gambar1 = collections.filter((collection) => {
        return collection.popular_collection === 1;
      });
      setIdGambar1(gambar1[0].id);
      const gambar2 = collections.filter((collection) => {
        return collection.popular_collection === 2;
      });
      setIdGambar2(gambar2[0].id);
      const gambar3 = collections.filter((collection) => {
        return collection.popular_collection === 3;
      });
      setIdGambar3(gambar3[0].id);
      const gambar4 = collections.filter((collection) => {
        return collection.popular_collection === 4;
      });
      setIdGambar4(gambar4[0].id);
      console.log(idGambar1, idGambar2, idGambar3, idGambar4)
    }
  }, [isFetching, data?.data]);

  const defaultValues = React.useMemo(
    () => ({
      gambar1: idGambar1,
      gambar2: idGambar2,
      gambar3: idGambar3,
      gambar4: idGambar4,
    }),
    [idGambar1, idGambar2, idGambar3, idGambar4]
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
  });

  return (
    <div className="popular-collection">
      <AdminTitle props={"Popular Collection"} />
      <div className="popular-collection-content">
        <div className="popular-collection-selector">
          {/* {isFetching ? (
            <></>
          ) : ( */}
            <Form onSubmit={onSubmit} methods={methods}>
              <CollectionSelectInput label="Gambar 1" name="gambar1" />
              <Separator _gap={36} />
              <CollectionSelectInput label="Gambar 2" name="gambar2" />
              <Separator _gap={36} />
              <CollectionSelectInput label="Gambar 3" name="gambar3" />
              <Separator _gap={36} />
              <CollectionSelectInput label="Gambar 4" name="gambar4" />
              <Separator _gap={36} />
              <button className="save-popular-collection">SIMPAN</button>
            </Form>
          {/* )} */}
        </div>
        <div className="popular-collection-display">
          <div className="popular-collection-1">1</div>
          <div className="popular-collection-2">2</div>
          <div className="popular-collection-3">3</div>
          <div className="popular-collection-4">4</div>
        </div>
      </div>
    </div>
  );
};

export default PopularCollection;
