import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";

import ManageStudentStats from "../components/admin/ManageStudents/ManageStudentStats.jsx";
import ManageStudentFilters from "../components/admin/ManageStudents/ManageStudentFilters.jsx";
import ManageStudentTable from "../components/admin/ManageStudents/ManageStudentTable.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getStudent } from "../store/actions/StudentAction.jsx";
import { toast } from "react-toastify";



function ManageStudentsPage() {
    const [filters, setFilters] = useState({
        status: "All",
    });
    const { students, loading, error } = useSelector((state) => state.student)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getStudent());
    }, [dispatch]);
    console.log(students);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };
    const studentList = students?.students || [];

    const [searchTerm, setSearchTerm] = useState('');
    console.log(searchTerm);

    const filteredStudents = studentList.filter((student) => {

        const matchesSearch =
            student?.fullName?.firstName
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase());

        let matchesStatus = true;

        if (filters.status === "Active") {
            matchesStatus = !student.isBlocked;
        } else if (filters.status === "Blocked") {
            matchesStatus = student.isBlocked;
        }

        return matchesSearch && matchesStatus;
    });


    return (
        <AdminLayout>
            <h1 className="dashboard-header">Manage Students</h1>

            <ManageStudentStats students={students} />

            <ManageStudentFilters
                filters={filters}
                setFilters={handleFilterChange}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />

            <ManageStudentTable
                students={filteredStudents}
                view={filters.view}
            />
        </AdminLayout>
    );
}

export default ManageStudentsPage;