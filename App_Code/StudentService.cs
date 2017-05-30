﻿using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Web.Script.Serialization;
using System.Web.Services;

/// <summary>
/// Summary description for StudentService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
public class StudentService : System.Web.Services.WebService
{

    public StudentService()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public void GetAllStudents()
    {
        System.Threading.Thread.Sleep(2000); //fake latency

        List<Student> listStudents = new List<Student>();

        string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
        using (SqlConnection con = new SqlConnection(cs))
        {
            SqlCommand cmd = new SqlCommand("Select * from tblStudents", con);
            con.Open();
            SqlDataReader rdr = cmd.ExecuteReader();
            while (rdr.Read())
            {
                Student student = new Student();
                student.id = Convert.ToInt32(rdr["Id"]);
                student.name = rdr["Name"].ToString();
                student.gender = rdr["Gender"].ToString();
                student.city = rdr["City"].ToString();
                listStudents.Add(student);
            }
        }

        JavaScriptSerializer js = new JavaScriptSerializer();
        Context.Response.Write(js.Serialize(listStudents));
    }

    [WebMethod]
    public void GetStudent(int id)
    {
        Student student = new Student();

        string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
        using (SqlConnection con = new SqlConnection(cs))
        {
            SqlCommand cmd = new
                SqlCommand("Select * from tblStudents where id = @id", con);

            SqlParameter param = new SqlParameter()
            {
                ParameterName = "@id",
                Value = id
            };

            cmd.Parameters.Add(param);

            con.Open();
            SqlDataReader rdr = cmd.ExecuteReader();
            while (rdr.Read())
            {
                student.id = Convert.ToInt32(rdr["Id"]);
                student.name = rdr["Name"].ToString();
                student.gender = rdr["Gender"].ToString();
                student.city = rdr["City"].ToString();
            }
        }

        JavaScriptSerializer js = new JavaScriptSerializer();
        Context.Response.Write(js.Serialize(student));
    }

    [WebMethod]
    public void GetStudentsByName(string name)
    {
        List<Student> listStudents = new List<Student>();

        string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
        using (SqlConnection con = new SqlConnection(cs))
        {
            SqlCommand cmd = new SqlCommand("Select * from tblStudents where name like @name", con);
            SqlParameter param = new SqlParameter()
            {
                ParameterName = "@name",
                Value = name + "%"
            };
            cmd.Parameters.Add(param);
            con.Open();
            SqlDataReader rdr = cmd.ExecuteReader();
            while (rdr.Read())
            {
                Student student = new Student();
                student.id = Convert.ToInt32(rdr["Id"]);
                student.name = rdr["Name"].ToString();
                student.gender = rdr["Gender"].ToString();
                student.city = rdr["City"].ToString();
                listStudents.Add(student);
            }
        }

        JavaScriptSerializer js = new JavaScriptSerializer();
        Context.Response.Write(js.Serialize(listStudents));
    }

    [WebMethod]
    public void GetStudentTotals()
    {
        studentTotals totals = new studentTotals();

        string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
        using (SqlConnection con = new SqlConnection(cs))
        {
            SqlCommand cmd = new SqlCommand("SELECT COALESCE(Gender, 'GrandTotal') AS Gender, COUNT(*) AS Total FROM tblStudents GROUP BY ROLLUP(Gender)", con);
            con.Open();
            SqlDataReader rdr = cmd.ExecuteReader();
            while (rdr.Read())
            {
                switch (rdr["Gender"].ToString())
                {
                    case "Male":
                        totals.males = Convert.ToInt32(rdr["Total"]);
                        break;
                    case "Female":
                        totals.females = Convert.ToInt32(rdr["Total"]);
                        break;
                    default:
                        totals.total = Convert.ToInt32(rdr["Total"]);
                        break;
                }
            }
        }

        JavaScriptSerializer js = new JavaScriptSerializer();
        Context.Response.Write(js.Serialize(totals));
    }

}
