import AdminTitle from "../../components/AdminTitle/AdminTitle";
import "./PopularCollection.css";
import Form from "../../components/field/form";
import { useForm, useFormContext, useWatch } from "react-hook-form";
import * as React from "react";
import * as Yup from "yup";
import CollectionSelectInput from "../../components/Select/collection-select-input";
import Separator from "../../components/separator";
import useYupValidationResolver from "../../hooks/use-yup-resolver";
import {
  getCollections,
  updatePopularCollection,
} from "../../services/collection";
import { useQuery } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { AspectRatio, Image } from "@mantine/core";

const gambarCollections = ["gambar1", "gambar2", "gambar3", "gambar4"];
const fileCollections = ["file1", "file2", "file3", "file4"];
const defaultCollections = ["default1", "default2", "default3", "default4"];

const CollectionView = () => {
  const { control } = useFormContext();
  const values = useWatch({
    control,
    name: fileCollections,
  });
  return (
    <div className="popular-collection-display">
      {values.map((value, index) =>
        !!value ? (
          <div className={`popular-collection-${index + 1}`}>
            <AspectRatio ratio={1 / 1}>
              <Image src={value} alt="Popular Collection" fit="contain"></Image>
            </AspectRatio>
          </div>
        ) : (
          // <img src={value} className={`popular-collection-${index + 1}`} />
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
  const [initiate, setInitiate] = React.useState(false);
  const { data, isFetching } = useQuery(["get-collections-data"], () =>
    getCollections()
  );

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
      default1: "",
      default2: "",
      default3: "",
      default4: "",
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

  const setDefaultValeus = React.useCallback(() => {}, []);

  const onSubmit = React.useCallback(
    async (values) => {
      try {
        const duplicates = {};
        let hasDuplicate = false;

        gambarCollections.map((key) => {
          if (duplicates[values[key]]) {
            duplicates[values[key]] += 1;
            methods.setError(key, {
              message: "data ini ada duplikasi dengan data lain",
              type: "custom",
            });
            hasDuplicate = true;
          } else {
            duplicates[values[key]] = 1;
          }
        }, []);

        if (hasDuplicate) {
          notifications.show({
            title: "Duplikasi Data",
            message: "Data tidak boleh ada duplikasi",
            color: "red",
          });
          return;
        }

        //set default to 0
        defaultCollections.map((key) => {
          const id = values[key];
          updatePopularCollection(id, { popular_collection: 0 });
        });

        //set to collection to popular value
        gambarCollections.map((key, index) => {
          const id = values[key];
          methods.setValue(`default${index + 1}`, id);

          updatePopularCollection(id, { popular_collection: index + 1 });
        });
      } catch (e) {
        console.log(e);
      } finally {
      }
    },
    [methods]
  );

  React.useEffect(() => {
    if (!initiate && data?.data) {
      ["file1", "file2", "file3", "file4"].map((_, index) => {
        const collection = data.data.find(
          (val) => val.popular_collection === index + 1
        );

        if (!!collection) {
          methods.setValue(`gambar${index + 1}`, collection.id);
          methods.setValue(`default${index + 1}`, collection.id);
          methods.setValue(`file${index + 1}`, collection.gambar);
        }
      });

      setInitiate(true);
    }
  }, [data?.data, initiate, methods]);

  return (
    <div className="popular-collection">
      <Form onSubmit={onSubmit} methods={methods}>
        <AdminTitle props={"Popular Collection"} />
        <div className="popular-collection-content">
          <div className="popular-collection-selector">
            {gambarCollections.map((value, index) => {
              return (
                <>
                  <CollectionSelectInput
                    label={`Gambar ${index + 1}`}
                    name={value}
                    onAfterChangeDetail={(value) =>
                      methods.setValue(`file${index + 1}`, value.extra.gambar)
                    }
                  />
                  <Separator _gap={16} />
                </>
              );
            })}
            <button className="save-popular-collection">SIMPAN</button>
          </div>
          <CollectionView />
        </div>
      </Form>
    </div>
  );
};

export default PopularCollection;
