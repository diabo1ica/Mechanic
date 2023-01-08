import React from 'react'
import Layout from '../../../../components/layouts/Layout'
import { useFormik } from 'formik';
import * as Yup from "yup";
import TextInput from '../../../../components/widgets/TextInput';
import BackButton from '../../../../components/widgets/BackButton';
import SubmitButton from '../../../../components/widgets/SubmitButton';
import { post } from '../../../../utils/api';
import { apiUrl } from '..';
import { Toast } from '../../../../utils/swal';
import { useRouter } from 'next/router';
import SelectInput from '../../../../components/widgets/SelectInput';

// Setup validasi form
const validationSchema = Yup.object().shape({
    mesin: Yup.string().required("Wajib diisi!"),
    kategori: Yup.string().required("Wajib diisi!"),
    lokasi: Yup.string().required("Wajib diisi!"),
    merk: Yup.string().required("Wajib diisi!"),
    status: Yup.string().required("Wajib diisi!")
});

export const status = [
    {
        value: "active",
        label: "Active"
    },
    {
        value: "inactive",
        label: "Inactive"
    }
]

const Add = () => {
    const context = "Mesin";
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const form = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            mesin: "",
            kategori: "",
		    lokasi: "",
	        merk: "",
	        status: "active"
        },
        onSubmit: (values) => {
            setLoading(true);
            post(apiUrl, values)
                .then(result => {
                    if (result?.data?.id) {
                        Toast.fire({
                            icon: "success",
                            text: result?.message
                        }).then(() => {
                            router.back();
                        })
                    }
                })
                .catch(error => {
                    Toast.fire({
                        icon: "error",
                        text: "Gagal menyimpan data",
                        timer: 5000
                    });
                })
                .finally(() => {
                    setTimeout(() => {
                        setLoading(false);
                    }, 1000);
                })
        }
    });
    return (
        <Layout title={`Tambah ${context}`}>
            <div className="card-page">
                <form onSubmit={form.handleSubmit}>
                    <div>
                        <TextInput form={form} label="Mesin" name="mesin" />
                        <TextInput form={form} label="Kategori" name="kategori" />
                        <TextInput form={form} label="Lokasi" name="lokasi" />
                        <TextInput form={form} label="Merk" name="merk" />
                        <SelectInput form={form} label="Status" name="status" options={status} />
                    </div>
                    <div className="card-page-footer">
                        <BackButton />
                        <SubmitButton loading={loading} />
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default Add